import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import { isEmpty } from "./lib/isEmpty";

export default async function middleware(request:NextRequest){
    if(request.nextUrl.pathname.startsWith("/api-doc")){
        const ALLOWED_IPS = process.env.NEXT_PUBLIC_ALLOWED_IPS
        ? process.env.NEXT_PUBLIC_ALLOWED_IPS.split(",")
        : [];

        if(!Array.isArray(ALLOWED_IPS) || 0 === ALLOWED_IPS.length){
            console.error("アクセス許可するIPアドレスの環境変数が設定されていません。");
            return new NextResponse(null,{status:500});
        }

        let ip:string = "";
        try{
            //IPアドレス取得
            //TODO ミドルウェアではaxiosが使えないためfetchを使用
            let res = await fetch("https://api.ipify.org/?format=json");
            let json = await res.json();
            ip = json.ip;
        } catch(error:any){
            console.error(error);
            console.error("ipアドレス取得APIへのリクエストに失敗しました");
            return new NextResponse(null,{status:500});
        }

        //IPアドレスの取得に失敗
        if(isEmpty(ip)){
            console.error("ipアドレスの取得に失敗しました");
            return new NextResponse(null,{status:500});
        }

        //許可されていないIPアドレス以外の場合
        if(ALLOWED_IPS.includes(ip) === false){
            console.error(`アクセスが許可されていないIPアドレス。IPアドレス:${ip}`);
            return new NextResponse(null,{status:403});
        }
    }
    return NextResponse.next();
}