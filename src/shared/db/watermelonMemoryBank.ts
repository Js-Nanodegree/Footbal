import { appSchema, tableSchema, Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

// 1. Схема таблицы кэша
export const cacheSchema = tableSchema( {
    name: 'cache',
    columns: [
        { name: 'key', type: 'string', isIndexed: true },
        { name: 'data', type: 'string' },
        { name: 'updated_at', type: 'number' },
    ],
} );

// 2. Модель записи кэша
export class CacheEntry extends Model
{
    static table = 'cache';
    @field( 'key' ) key!: string;
    @field( 'data' ) data!: string;
    @field( 'updated_at' ) updatedAt!: number;
}

// 3. Схема БД
const schema = appSchema( {
    version: 1,
    tables: [ cacheSchema ],
} );

// 4. Адаптер и инициализация
const adapter = new SQLiteAdapter( { schema } );
export const database = new Database( {
    adapter,
    modelClasses: [ CacheEntry ],
} );

// 5. API memory-bank
export async function getCache<T>( key: string ): Promise<T | null>
{
    const records = await database.collections.get<CacheEntry>( 'cache' ).query().fetch();
    const found = records.find( ( r ) => r.key === key );
    if ( found ) return JSON.parse( found.data ) as T;
    return null;
}

export async function setCache<T>( key: string, value: T ): Promise<void>
{
    await database.action( async () =>
    {
        // Удаляем старую запись, если есть
        const records = await database.collections.get<CacheEntry>( 'cache' ).query().fetch();
        const found = records.find( ( r ) => r.key === key );
        if ( found ) await found.markAsDeleted();
        await database.collections.get<CacheEntry>( 'cache' ).create( ( entry ) =>
        {
            entry.key = key;
            entry.data = JSON.stringify( value );
            entry.updatedAt = Date.now();
        } );
    } );
}

export async function clearCache( key: string ): Promise<void>
{
    await database.action( async () =>
    {
        const records = await database.collections.get<CacheEntry>( 'cache' ).query().fetch();
        const found = records.find( ( r ) => r.key === key );
        if ( found ) await found.markAsDeleted();
    } );
}

export async function clearAllCache(): Promise<void>
{
    await database.action( async () =>
    {
        const records = await database.collections.get<CacheEntry>( 'cache' ).query().fetch();
        for ( const r of records ) await r.markAsDeleted();
    } );
} 