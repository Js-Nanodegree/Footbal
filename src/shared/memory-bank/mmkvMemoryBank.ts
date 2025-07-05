import { MMKV } from 'react-native-mmkv';
import { useEffect, useState } from 'react';

const storage = new MMKV();

export function getCache<T>(key: string): T | null {
    const value = storage.getString(key);
    if (!value) return null;
    try {
        return JSON.parse(value) as T;
    } catch {
        return null;
    }
}

export function setCache<T>(key: string, value: T): void {
    storage.set(key, JSON.stringify(value));
}

export function clearCache(key: string): void {
    storage.delete(key);
}

export function clearAllCache(): void {
    storage.clearAll();
}

export const NETWORK_STATUS_KEY = 'network_status';

export function useMMKVNetworkStatus(): boolean {
    const [isConnected, setIsConnected] = useState<boolean>(() => {
        const cached = getCache<boolean>(NETWORK_STATUS_KEY);
        return cached !== null ? cached : true;
    });
    useEffect(() => {
        const interval = setInterval(() => {
            const cached = getCache<boolean>(NETWORK_STATUS_KEY);
            setIsConnected(cached !== null ? cached : true);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return isConnected;
} 