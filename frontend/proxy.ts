import { NextRequest, NextResponse } from "next/server";
import axiosClient from "./lib/services/apiclient";
export const config={
    matcher: ["/admin/:path*"]
}

export async function proxy (req:NextRequest){
    const token = req.cookies.get ("auAc_59")?.value
    if (!token){
        return NextResponse.redirect(new URL('/login', req.url))
    } try {
        await axiosClient.get ('/auth/me',{
            headers:{
                "Authorization":"Bearer "+ token
            }
        })
        return NextResponse.next()
    } catch (exception) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}