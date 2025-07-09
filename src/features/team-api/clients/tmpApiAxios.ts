import axios, { AxiosInstance, AxiosProgressEvent, AxiosRequestConfig, CancelTokenSource } from 'axios';
import axiosRetry from 'axios-retry';
import reactotron from 'reactotron-react-native';
// import * as Sentry from '@sentry/react-native'; // если используется Sentry
import { showErrorNotification } from 'src/shared/utils/showErrorNotification';

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
            reactotron.log( '[API REQUEST]', config.method, config.url, config.params );
            return config;
        } );
        this.instance.interceptors.response.use(
            response =>
            {
                reactotron.log( '[API RESPONSE]', response.status, response.config.url );
                return response;
            },
            error =>
            {
                reactotron.log( '[API ERROR]', {
                    url: error.config?.url,
                    method: error.config?.method,
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                } );
                // if (Sentry) Sentry.captureException(error);
                if ( error.response )
                {
                    const status = error.response.status;
                    let customMessage = '';
                    switch ( status )
                    {
                        case 400:
                            customMessage = 'Некорректный запрос (400)';
                            break;
                        case 403:
                            customMessage = 'Доступ запрещён (403)';
                            break;
                        case 404:
                            customMessage = 'Не найдено (404)';
                            break;
                        case 429:
                            customMessage = 'Слишком много запросов (429). Попробуйте позже.';
                            break;
                        default:
                            customMessage = error.message || 'Ошибка API';
                    }
                    if ( status === 429 )
                    {
                        showErrorNotification( 'Превышен лимит запросов к серверу. Подождите и попробуйте снова.' );
                    }
                    return Promise.reject( new Error( customMessage ) );
                }
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

const BASE_URL = 'https://api.football-data.org/v4';
export const tmpApiAxios = new TMPApiAxios( BASE_URL, { 'X-Auth-Token': 'bf63b2eaacf54ac0b42620ac5c820ec7' } ); 