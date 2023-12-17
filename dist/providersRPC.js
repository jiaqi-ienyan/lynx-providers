"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticRpcBatchProvider = exports.getStaticRpcProvider = exports.getRpcBatchProvider = exports.getRpcProvider = void 0;
var providers_1 = require("@ethersproject/providers");
var staticJsonRpcBatchProvider_1 = require("./staticJsonRpcBatchProvider");
var createProviderGetter = function (Provider) {
    var cache = new Map();
    return function (chainId, url, cacheSeed, pollingInterval) {
        if (cacheSeed === void 0) { cacheSeed = 0; }
        if (pollingInterval === void 0) { pollingInterval = null; }
        var cacheKey = "".concat(chainId, "-").concat(cacheSeed, "-").concat(url);
        var provider = cache.get(cacheKey);
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
exports.getRpcProvider = createProviderGetter(providers_1.JsonRpcProvider);
exports.getRpcBatchProvider = createProviderGetter(providers_1.JsonRpcBatchProvider);
exports.getStaticRpcProvider = createProviderGetter(providers_1.StaticJsonRpcProvider);
exports.getStaticRpcBatchProvider = createProviderGetter(staticJsonRpcBatchProvider_1.StaticJsonRpcBatchProvider);
