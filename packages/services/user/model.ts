import {z} from "zod"
// bussiness login k liye input auur output model define karne k liye zod ka use kiya gya hai
export const createUserWithEmailAndPassword = z.object({
    email: z.string().describe("The email of user"),
    fullName: z.string().describe("The full name of user"),
    password: z.string().describe("The password of user")
})

export type CreateUserWithEmailAndPasswordType = z.infer<typeof createUserWithEmailAndPassword>  

export const generateUserTokenPaylod = z.object({
    id: z.string().describe("The id of user"),
})

export type GenerateUserTokenPayloadType = z.infer<typeof generateUserTokenPaylod>


export const signiInUserWithEmailAndPassword = z.object({
    email: z.string().describe("The email of user"),
    password: z.string().describe("The password of user")
})

export type signInUserWithEmailAndPasswordType = z.infer<typeof signiInUserWithEmailAndPassword>


// export const getUserById = z.object({
//     id: z.string().describe("The id of user"),
//     fullName: z.string().describe("The full name of user"),
//     email: z.string().describe("The email of user"),
// })

// export type getUserByIdType = z.infer<typeof getUserById>