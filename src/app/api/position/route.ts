import { NextRequest, NextResponse } from 'next/server';
import {NormalizeResult, normalize} from "@geolonia/normalize-japanese-addresses";
import fs from 'fs'; 

export async function GET(request: NextRequest){
    let readStoreInfos = fs.readFileSync("./src/app/storeInfos.json","utf-8")
    let storeInfosJson = JSON.parse(readStoreInfos);
    let res = {
        storeInfos:storeInfosJson.storeInfos
    }
    return NextResponse.json(res);
}

/**
 * 緯度と経度を取得する
 * @param adresses 住所
 * @returns 
 */
const normalizes = async(adresses:string[]) => {
    const tasks = [];
    for(let adress of adresses){
        tasks.push(normalize(adress));
    }
    let res:NormalizeResult[] = await Promise.all(tasks);
    return res;
}