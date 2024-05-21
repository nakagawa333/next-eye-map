import { NextRequest, NextResponse } from 'next/server';
import {NormalizeResult, normalize} from "@geolonia/normalize-japanese-addresses";
import fs from 'fs'; 
import { Postgress } from '@/lib/postgres';
import { isTaggedTemplateExpression } from 'typescript';
import { StoreInfo } from '@/interfaces/storeInfo';

/**
 * @swagger
 * /api/position:
 *   get:
 *     summary: 店舗情報一覧API
 *     description: 各店舗情報一覧を返却するAPI
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 */
export async function GET(){

    let res = {
        storeInfos:{}
    };
    let env = process.env.NEXT_PUBLIC_ENV;
    if(env === "dev"){
        let postgress = new Postgress();
        try{
            //接続
            await postgress.init();
        } catch(error:any){
            console.error("DB接続に失敗しました");
            console.error(error);
        }
    
        try{
            let storeInfoExe = await postgress.scan("select * from store_info;");
            let tagExe = await postgress.scan("select si.id,tag.tag_id,tag.tag_name from store_info as si inner join tag on si.id = tag.id group by si.id,tag.tag_id,tag.tag_name;");
            let tagMap = new Map();

            for(let row of tagExe.rows){
                let id = row.id;
                let tagName = row.tag_name;
                if(tagMap.has(id)){
                    let tag = tagMap.get(id);
                    tag.push(tagName);
                    tagMap.set(id,tag);
                } else {
                    tagMap.set(id,[tagName]);
                }
            }

            let storeInfos = [];

            for(let row of storeInfoExe.rows){
                let id = row.id;
                let storeInfo:StoreInfo = {
                    id:id,
                    storeName:row.store_name,
                    address:row.address,
                    content:row.content,
                    businessHour:row.businessHour,
                    lat:row.lat,
                    lng:row.lng,
                    phoneNumber:row.phone_number
                }
                if(tagMap.has(id)){
                    storeInfo.tags = tagMap.get(id);
                }
                storeInfos.push(storeInfo);
            }
            res.storeInfos = storeInfos;
        } catch(error:any){
            console.error(error);
        }
    
        //DB切断
        await postgress.end();
    } else if(env === "prod"){
        //TODO Neon対応後、DB接続処理実装
        let readStoreInfos = fs.readFileSync("./src/app/storeInfos.json","utf-8")
        let storeInfosJson = JSON.parse(readStoreInfos);

        res = {
            storeInfos:storeInfosJson.storeInfos
        }
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