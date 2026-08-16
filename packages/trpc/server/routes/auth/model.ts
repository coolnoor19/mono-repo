import {z} from "zod" 
// procedure k liye input auur output model define karne k liye zod ka use kiya gya hai
export const createUserWithEmailAndPasswordInputModel = z.object({
    fullName : z.string().min(1).max(100).describe("Full name of the user"),
    email : z.string().email().describe("Email address of the user"),
    password : z.string().min(8).max(100).describe("Password of the user")
})

export const createUserWithEmailAndPasswordOutputModel = z.object({
    id : z.string().describe("Unique identifier of the user"),
})


export const signInUserWithEmailAndPasswordInputModel = z.object({
    email : z.string().email().describe("Email address of the user"),
    password : z.string().min(8).max(100).describe("Password of the user")
})

export const signInUserWithEmailAndPasswordOutputModel = z.object({
    id : z.string().describe("Unique identifier of the user"),
    token : z.string().describe("JWT token for authentication")
})

export const getLoggedInUSerInfoInputModel = z.undefined()
export const getLoggedInUserInfoOutputModel = z.object({
    id : z.string().describe("Unique identifier of the user"),
    fullName : z.string().describe("Full name of the user"),
    email : z.string().email().describe("Email address of the user"),
})