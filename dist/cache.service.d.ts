import { Observable } from 'rxjs/Observable';
import { CacheStorageService, StorageCacheItem } from './cache-storage';
export interface CacheConfig {
    keyPrefix?: string;
}
export declare const MESSAGES: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
};
export declare type CacheValueFactory<T> = () => Promise<T>;
export declare class CacheService {
    private _storage;
    private ttl;
    private cacheEnabled;
    private invalidateOffline;
    private networkStatusChanges;
    private networkStatus;
    static request: any;
    static response: any;
    static responseOptions: any;
    static httpDeprecated: boolean;
    constructor(_storage: CacheStorageService);
    private loadCache();
    private loadHttp();
    ready(): Promise<any>;
    /**
     * @description Disable or enable cache
     */
    enableCache(enable?: boolean): void;
    /**
     * @description Delete DB table and create new one
     * @return {Promise<any>}
     */
    private resetDatabase();
    /**
     * @description Set default TTL
     * @param {number} ttl - TTL in seconds
     */
    setDefaultTTL(ttl: number): number;
    /**
     * @description Set if expired cache should be invalidated if device is offline
     * @param {boolean} offlineInvalidate
     */
    setOfflineInvalidate(offlineInvalidate: boolean): void;
    /**
     * @description Start watching if devices is online or offline
     */
    private watchNetworkInit();
    /**
     * @description Stream of network status changes
     * * @return {Observable<boolean>} network status stream
     */
    getNetworkStatusChanges(): Observable<boolean>;
    /**
     * @description Check if devices is online
     * @return {boolean} network status
     */
    isOnline(): boolean;
    /**
     * @description Save item to cache
     * @param {string} key - Unique key
     * @param {any} data - Data to store
     * @param {string} [groupKey] - group key
     * @param {number} [ttl] - TTL in seconds
     * @return {Promise<any>} - saved data
     */
    saveItem(key: string, data: any, groupKey?: string, ttl?: number): Promise<any>;
    /**
     * @description Delete item from cache
     * @param {string} key - Unique key
     * @return {Promise<any>} - query execution promise
     */
    removeItem(key: string): Promise<any>;
    /**
     * @description Removes all items with a key that matches pattern
     * @return {Promise<any>}
     */
    removeItems(pattern: string): Promise<any>;
    /**
     * @description Get item from cache without expire check etc.
     * @param {string} key - Unique key
     * @return {Promise<any>} - data from cache
     */
    getRawItem<T = any>(key: string): Promise<StorageCacheItem>;
    getRawItems(): Promise<StorageCacheItem[]>;
    /**
     * @description Check if item exists in cache regardless if expired or not
     * @param {string} key - Unique key
     * @return {Promise<boolean | string>} - boolean - true if exists
     */
    itemExists(key: string): Promise<boolean | string>;
    /**
     * @description Get item from cache with expire check and correct type assign
     * @param {string} key - Unique key
     * @return {Promise<any>} - data from cache
     */
    getItem<T = any>(key: string): Promise<T>;
    getOrSetItem<T>(key: string, factory: CacheValueFactory<T>, groupKey?: string, ttl?: number): Promise<T>;
    /**
     * @description Decode raw data from DB
     * @param {any} data - Data
     * @return {any} - decoded data
     */
    static decodeRawData(data: StorageCacheItem): any;
    /**
     * @description Load item from cache if it's in cache or load from origin observable
     * @param {string} key - Unique key
     * @param {any} observable - Observable with data
     * @param {string} [groupKey] - group key
     * @param {number} [ttl] - TTL in seconds
     * @return {Observable<any>} - data from cache or origin observable
     */
    loadFromObservable<T = any>(key: string, observable: any, groupKey?: string, ttl?: number): Observable<T>;
    /**
     * @description Load item from cache if it's in cache or load from origin observable
     * @param {string} key - Unique key
     * @param {any} observable - Observable with data
     * @param {string} [groupKey] - group key
     * @param {number} [ttl] - TTL in seconds
     * @param {string} [delayType='expired']
     * @param {string} [metaKey] - property on T to which to assign meta data
     * @return {Observable<any>} - data from cache or origin observable
     */
    loadFromDelayedObservable<T = any>(key: string, observable: Observable<T>, groupKey?: string, ttl?: number, delayType?: string, metaKey?: string): Observable<T>;
    /**
     * Perform complete cache clear
     * @return {Promise<any>}
     */
    clearAll(): Promise<any>;
    /**
     * @description Remove all expired items from cache
     * @param {boolean} ignoreOnlineStatus -
     * @return {Promise<any>} - query promise
     */
    clearExpired(ignoreOnlineStatus?: boolean): Promise<any>;
    /**
     * @description Remove all item with specified group
     * @param {string} groupKey - group key
     * @return {Promise<any>} - query promise
     */
    clearGroup(groupKey: string): Promise<any>;
    /**
     * @description Check if it's an request
     * @param {any} data - Variable to test
     * @return {boolean} - data from cache
     */
    static isRequest(data: any): boolean;
}
