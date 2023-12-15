import { JsonRpcProvider, JsonRpcBatchProvider, StaticJsonRpcProvider } from '@ethersproject/providers';
import { StaticJsonRpcBatchProvider } from './staticJsonRpcBatchProvider';
const createProviderGetter = (Provider) => {
    const cache = new Map();
    return (chainId, url, cacheSeed = 0, pollingInterval = null) => {
        const cacheKey = `${chainId}-${cacheSeed}-${url}`;
        let provider = cache.get(cacheKey);
        if (!provider) {
            provider = new Provider(url, chainId);
            cache.set(cacheKey, provider);
        }
        if (pollingInterval) {
            provider.pollingInterval = pollingInterval;
        }
        return provider;
    };
};
export const getRpcProvider = createProviderGetter(JsonRpcProvider);
export const getRpcBatchProvider = createProviderGetter(JsonRpcBatchProvider);
export const getStaticRpcProvider = createProviderGetter(StaticJsonRpcProvider);
export const getStaticRpcBatchProvider = createProviderGetter(StaticJsonRpcBatchProvider);
