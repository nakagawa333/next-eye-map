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

        //IPアドレス取得処理
        let ip:string = request.ip ?? request.headers.get('x-real-ip') ?? '';
        if(!ip){
            const forwardFor = request.headers.get("x-forwarded-for");
            ip = forwardFor ? forwardFor.split(',')[0] : '';
        }

        if(isEmpty(ip)){
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