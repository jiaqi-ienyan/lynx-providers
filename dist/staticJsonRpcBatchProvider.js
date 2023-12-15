var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JsonRpcBatchProvider } from '@ethersproject/providers';
import { defineReadOnly } from '@ethersproject/properties';
import { Logger } from '@ethersproject/logger';
/*
 * is based on
 * https://github.com/ethers-io/ethers.js/blob/master/packages/providers/src.ts/url-json-rpc-provider.ts#L28
 */
const logger = new Logger('StaticJsonRpcBatchProvider/1.0');
export class StaticJsonRpcBatchProvider extends JsonRpcBatchProvider {
    detectNetwork() {
        const _super = Object.create(null, {
            detectNetwork: { get: () => super.detectNetwork }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let network = this.network;
            if (network == null) {
                network = yield _super.detectNetwork.call(this);
                if (!network) {
                    logger.throwError('no network detected', Logger.errors.UNKNOWN_ERROR, {});
                }
                // If still not set, set it
                if (this._network == null) {
                    // A static network does not support "any"
                    defineReadOnly(this, '_network', network);
                    this.emit('network', network, null);
                }
            }
            return network;
        });
    }
}
