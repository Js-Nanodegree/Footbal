import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource, AxiosResponse, AxiosError, AxiosProgressEvent } from 'axios';
import axiosRetry from 'axios-retry';
// import * as Sentry from '@sentry/react-native'; // если используется Sentry

// Memory cache (примитивный, для примера)
const memoryCache = new Map<string, any>();

// @ts-ignore
// eslint-disable-next-line no-var
declare var process: any;

/**
 * Современный HTTP-клиент для API:
 * - Поддержка отмены, кэширования, mock-режима
 * - Глобальные перехватчики, логирование, интеграция с Sentry
 * - Поддержка прогресса upload/download
 * - Типизация ответов, расширяемость для production
 * Контекст: Используется в TeamApiService для всех axios-запросов.
 */
export class TMPApiAxios
{
    private instance: AxiosInstance;
    private activeRequests: Map<string, CancelTokenSource> = new Map();
    private mockMode = false;
    private mockHandlers: Map<string, ( config: AxiosRequestConfig ) => any> = new Map();

    constructor( baseURL: string, headers: Record<string, string>, timeout = 10000 )
    {
        this.instance = axios.create( { baseURL, headers, timeout } );
        axiosRetry( this.instance, { retries: 3, retryDelay: axiosRetry.exponentialDelay } );
        // Глобальные перехватчики
        this.instance.interceptors.request.use( config =>
        {
            console.log( '[API REQUEST]', config.method, config.url, config.params );
            return config;
        } );
        this.instance.interceptors.response.use(
            response =>
            {
                console.log( '[API RESPONSE]', response.status, response.config.url );
                return response;
            },
            error =>
            {
                console.error( '[API ERROR]', error );
                // if (Sentry) Sentry.captureException(error);
                // Refresh token пример (упрощённо)
                if ( error.response && error.response.status === 401 )
                {
                    // Можно реализовать refresh token логику здесь
                }
                return Promise.reject( error );
            }
        );
    }

    private getRequestKey( config: AxiosRequestConfig )
    {
        return `${ config.method || 'get' }:${ config.url }:${ JSON.stringify( config.params || {} ) }`;
    }

    // Включить mock-режим
    enableMock() { this.mockMode = true; }
    disableMock() { this.mockMode = false; }
    setMockHandler( key: string, handler: ( config: AxiosRequestConfig ) => any )
    {
        this.mockHandlers.set( key, handler );
    }

    // Основной запрос
    async request<T = any>( config: AxiosRequestConfig, abortKey?: string, useCache = false ): Promise<T>
    {
        const key = abortKey || this.getRequestKey( config );
        // Кэширование (memory)
        if ( useCache && memoryCache.has( key ) )
        {
            return memoryCache.get( key );
        }
        // Mock-режим
        if ( this.mockMode && this.mockHandlers.has( key ) )
        {
            return this.mockHandlers.get( key )!( config );
        }
        // Отмена предыдущего запроса с тем же ключом
        if ( abortKey && this.activeRequests.has( abortKey ) )
        {
            this.activeRequests.get( abortKey )!.cancel( 'Canceled due to new request' );
            this.activeRequests.delete( abortKey );
        }
        const source = axios.CancelToken.source();
        if ( abortKey ) this.activeRequests.set( abortKey, source );

        try
        {
            const response = await this.instance.request<T>( {
                ...config,
                cancelToken: source.token,
            } );
            if ( useCache ) memoryCache.set( key, response.data );
            return response.data;
        } finally
        {
            if ( abortKey ) this.activeRequests.delete( abortKey );
        }
    }

    // Upload с прогрессом
    async upload<T = any>( config: AxiosRequestConfig, onProgress: ( percent: number ) => void )
    {
        return this.instance.request<T>( {
            ...config,
            onUploadProgress: ( e: AxiosProgressEvent ) =>
            {
                if ( e.total && e.loaded )
                {
                    const percent = Math.round( ( e.loaded * 100 ) / e.total );
                    onProgress( percent );
                }
            },
        } );
    }

    // Download с прогрессом
    async download<T = any>( config: AxiosRequestConfig, onProgress: ( percent: number ) => void )
    {
        return this.instance.request<T>( {
            ...config,
            onDownloadProgress: ( e: AxiosProgressEvent ) =>
            {
                if ( e.total && e.loaded )
                {
                    const percent = Math.round( ( e.loaded * 100 ) / e.total );
                    onProgress( percent );
                }
            },
        } );
    }

    // Abort по ключу
    abort( abortKey: string )
    {
        if ( this.activeRequests.has( abortKey ) )
        {
            this.activeRequests.get( abortKey )!.cancel( 'Manually aborted' );
            this.activeRequests.delete( abortKey );
        }
    }

    // Очистить кэш
    clearCache()
    {
        memoryCache.clear();
    }
}

/**
 * Универсальное получение API_KEY для Node.js и React Native:
 * - В Node.js (тесты, сервер) используется process.env
 * - В React Native — @env через require
 */
let API_KEY = '';
try
{
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    API_KEY = require( '@env' ).FOOTBALL_DATA_API_KEY || '';
} catch ( e )
{
    if ( typeof process !== 'undefined' && process.env && process.env.FOOTBALL_DATA_API_KEY )
    {
        API_KEY = process.env.FOOTBALL_DATA_API_KEY;
    }
}
const BASE_URL = 'https://api.football-data.org/v4';
export const tmpApiAxios = new TMPApiAxios( BASE_URL, { 'X-Auth-Token': API_KEY } ); 