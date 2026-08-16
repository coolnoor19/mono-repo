import type { Request, Response , CookieOptions } from "express"
export function setCookie(res:Response , name:string , value:string , opts:CookieOptions){
    res.cookie(name , value , opts)
}

export function getCookie(req:Request , name:string ) : string | undefined{
    return req.cookies?.[name]
}

export function clearCookie(res:Response , name:string ){
    res.clearCookie(name)
}


/*
path : '/'
expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
*/