import {NormalizeResult, normalize} from "@geolonia/normalize-japanese-addresses";

/**
 * 緯度と経度を取得する
 * @param adresses 住所
 * @returns 
 */
export const getNormalize = async(adress:string) => {
    let res:NormalizeResult = await normalize(adress)
    return res;
}