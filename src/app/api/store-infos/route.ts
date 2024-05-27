import { NextRequest, NextResponse } from 'next/server';
import {NormalizeResult} from "@geolonia/normalize-japanese-addresses";
import fs from 'fs'; 
import { Postgress } from '@/lib/postgres';
import { StoreInfo } from '@/interfaces/storeInfo';
import { getNormalize } from '@/lib/normalize';
import crypto from 'crypto';
import { isEmpty } from '@/lib/isEmpty';
import EegexPatterns from '@/constants/regexPatterns';
import TableName from '@/constants/tableName';
import format from 'pg-format';
import { isJsxTagNameExpression } from 'typescript';
/**
 * @swagger
 * /api/store-infos:
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
            let storeInfoExe = await postgress.query(`select * from ${TableName.STOREINFO};`);
            let tagExe = await postgress.query(`select si.id,tag.tag_id,tag.tag_name from ${TableName.STOREINFO} as si inner join tag on si.id = tag.id group by si.id,tag.tag_id,tag.tag_name;`);
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
 * @swagger
 * /api/store-infos:
 *   post:
 *     summary: 店舗情報登録API
 *     description: 各店舗情報一覧を登録するAPI
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 */
export async function POST(request:NextRequest){
    let env = process.env.NEXT_PUBLIC_ENV;
    let json:any = await request.json();

    //住所
    let address:string = json.address;
    if(isEmpty(address)){
        return NextResponse.json({error:"住所は必須項目です"},{ status:400 });
    }
    //店舗名
    let storeName:string = json.storeName;
    if(isEmpty(storeName)){
        return NextResponse.json({error:"店舗名は必須項目です"},{ status:400 });
    }

    if(30 < storeName.length){
        return NextResponse.json({error:"店舗名は30文字以内でお願いします"},{ status:400 });
    }

    //営業時間
    let businessHour:string = json.businessHour;
    if(isEmpty(businessHour)){
        return NextResponse.json({error:"営業時間は必須項目です"},{ status:400 });
    }

    if(65535 < businessHour.length){
        return NextResponse.json({error:"営業時間は65535文字以内でお願いします"},{ status:400 });
    }

    //電話番号
    let phoneNumber:string = json.phoneNumber;

    if(!isEmpty(phoneNumber) && !EegexPatterns.PHONENUMBER.test(phoneNumber)){
        return NextResponse.json({error:"電話番号の値が不正です"},{ status:400 });
    }

    if(30 < phoneNumber.length){
        return NextResponse.json({error:"電話番号は30文字以内でお願いします"},{ status:400 });
    }

    //タグ一覧
    let tags:string[] = json.tags;

    //内容
    let content:string = json.content;

    if(env === "dev"){
        let postgress = new Postgress();

        try{
            //接続
            await postgress.init();
        } catch(error:any){
            console.error("DB接続に失敗しました");
            console.error(error);
            return NextResponse.json({error:"DB接続に失敗しました"},{ status:400 });
        }

        let normalize:NormalizeResult;

        try{
            //緯度と経度を取得
            normalize = await getNormalize(address);
        } catch(error:any){
            console.error("緯度と経度の取得に失敗しました");
            console.error(error);
            return NextResponse.json({error:"緯度と経度の取得に失敗しました"},{ status:400 });
        }

        let lat:number | null = normalize.lat;
        let lng:number | null = normalize.lng;

        //緯度を取得
        if(lat === null){
            return NextResponse.json({error:"緯度取得に失敗しました"},{ status:400 });
        }

        //経度を取得
        if(lng === null){
            return NextResponse.json({error:"経度取得に失敗しました"},{ status:400 });
        }
        
        let id:string = crypto.randomUUID();
        let createTime:Date = new Date();

        //トランザクション開始
        await postgress.query("BEGIN");

        //DB登録処理
        try{
            let storeInfoQuery:string = `insert into ${TableName.STOREINFO} (id,store_name,address,content,business_hour,lat,lng,create_time,phone_number) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
            await postgress.query(storeInfoQuery,[id,storeName,address,content,businessHour,lat,lng,createTime,phoneNumber]);

            let arr = [];
            for(let tag of tags){
                let tagId:string = crypto.randomUUID();
                arr.push([id,tagId,tag,createTime]);
            }

            let tagQuery:string = format(`insert into ${TableName.TAG} (id,tag_id,tag_name,create_time) values %L`,arr);
            await postgress.query(tagQuery);

            //コミット
            await postgress.query("COMMIT");

        } catch(error:any){
            console.error("データベースの登録に失敗しました");
            console.error(error);
            //ロールバック
            await postgress.query('ROLLBACK');
            return NextResponse.json({error:"データベースの登録に失敗しました"},{ status:400 });
        }

    }

    return NextResponse.json({message:"成功しました"},{ status:200 });
}