import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

// Минимальный EventEmitter для React Native (без зависимостей)
const store: Record<string, any> = {};
const listeners: Record<string, Set<(value: any) => void>> = {};

let isHydrated = false;
const pending: (() => void)[] = [];

async function hydrateStore() {
  if (isHydrated) return;
  const keys = await AsyncStorage.getAllKeys();
  const entries = await AsyncStorage.multiGet(keys);
  entries.forEach(([key, value]) => {
    try {
      store[key] = value ? JSON.parse(value) : null;
    } catch {
      store[key] = value;
    }
  });
  isHydrated = true;
  pending.forEach(fn => fn());
  pending.length = 0;
}

export async function setCache<T>(key: string, value: T): Promise<void> {
  store[key] = value;
  await AsyncStorage.setItem(key, JSON.stringify(value));
  if (listeners[key]) listeners[key].forEach(cb => cb(value));
}

export function getCache<T>(key: string): T | null {
  return key in store ? store[key] : null;
}

export async function clearCache(key: string): Promise<void> {
  delete store[key];
  await AsyncStorage.removeItem(key);
  if (listeners[key]) listeners[key].forEach(cb => cb(null));
}

export async function clearAllCache(): Promise<void> {
  Object.keys(store).forEach(key => {
    delete store[key];
    if (listeners[key]) listeners[key].forEach(cb => cb(null));
  });
  await AsyncStorage.clear();
}

export function subscribe<T>(key: string, callback: (value: T | null) => void): () => void {
  if (!listeners[key]) listeners[key] = new Set();
  listeners[key].add(callback);
  return () => {
    listeners[key].delete(callback);
    if (listeners[key].size === 0) delete listeners[key];
  };
}

export function useMemoryBankHydrated(): boolean {
  const [hydrated, setHydrated] = useState(isHydrated);
  useEffect(() => {
    if (isHydrated) return;
    hydrateStore().then(() => setHydrated(true));
  }, []);
  return hydrated;
}

export const NETWORK_STATUS_KEY = 'network_status';

export function useMMKVNetworkStatus(): boolean {
  const [isConnected, setIsConnected] = useState<boolean>(() => {
    const cached = getCache<boolean>(NETWORK_STATUS_KEY);
    return cached !== null ? cached : true;
  });
  useEffect(() => {
    const unsub = subscribe<boolean>(NETWORK_STATUS_KEY, (val) => {
      setIsConnected(val !== null ? val : true);
    });
    return unsub;
  }, []);
  return isConnected;
}

// Универсальный хук для реактивного доступа к любому ключу
export function useCache<T>( key: string, initialValue?: T ): T | undefined
{
  const [ value, setValue ] = useState<T | undefined>( () =>
  {
    const cached = getCache<T>( key );
    return cached !== null && cached !== undefined ? cached : initialValue;
  } );
  useEffect( () =>
  {
    const unsub = subscribe<T>( key, ( val ) =>
    {
      setValue( val !== null && val !== undefined ? val : initialValue );
    } );
    return unsub;
  }, [ key, initialValue ] );
  return value;
} 