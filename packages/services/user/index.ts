import {usersTable} from "@repo/database/models/user"
import {db, eq} from "@repo/database"
import bcrypt from "bcryptjs"
import * as JWT from "jsonwebtoken"
import { env } from "../env"
import { createUserWithEmailAndPassword , CreateUserWithEmailAndPasswordType , generateUserTokenPaylod,
    signiInUserWithEmailAndPassword,
    type signInUserWithEmailAndPasswordType,
    type GenerateUserTokenPayloadType
} from "./model"
export default class UserService {

    private async getUserByEmail(email:string){
        const result = await db.select().from(usersTable).where(eq(usersTable.email, email))
        
        if( !result || result.length === 0) return null

        return result[0]
    }

    private async generateUserToken(payload: GenerateUserTokenPayloadType){
        const {id} = await generateUserTokenPaylod.parseAsync(payload)

        const token = JWT.sign({id}, env.JWT_SECRET, {expiresIn: "1h"})
        return {token}
    }

    public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordType){
        // data receive and validate
        // check in db if this email already exist or not 
        // hash the paassword
        // create a new user in db
        // jwt token , we will set it in cookie
        // return 
        const {email , fullName ,password} = await createUserWithEmailAndPassword.parseAsync(payload)

        const existingUSer = await this.getUserByEmail(email)

        if(existingUSer) throw new Error("User already exist")

        const passwordHash = await bcrypt.hash(password, 10)

        const result = await db.insert(usersTable).values({
            fullName,
            email,
            passwordHash
        }).returning({
            id: usersTable.id
        })

        if(!result || result.length === 0 || !result[0]?.id) throw new Error("User creation failed")

        const {token} = await this.generateUserToken({id: result[0].id})
        return {
            id: result[0].id,
            token
        }
    }

    public async signInUserWithEmailAndPassword(payload : signInUserWithEmailAndPasswordType){
        // const user = await this.getUserByEmail(email)

        // if(!user) throw new Error("User not found")

        // const isPasswordMatch = await bcrypt.compare(password, user.passwordHash)

        // if(!isPasswordMatch) throw new Error("Invalid password")

        // const {token} = await this.generateUserToken({id: user.id})
        // return {
        //     id: user.id,
        //     token
        // }
        const { email , password} = await signiInUserWithEmailAndPassword.parseAsync(payload)

        const existingUser = await this.getUserByEmail(email)
        if(!existingUser){
            throw new Error("user with this email not exist")
        }

        if(!existingUser.passwordHash){
            throw new Error("Invalid authentication method")
        }

        const isValid = await bcrypt.compare(password, existingUser.passwordHash)
        if(!isValid){
            throw new Error("Invalid password")
        } 

        const {token} = await this.generateUserToken({id: existingUser.id})
        return {
            id: existingUser.id,
            token
        }
    }

    public async getUserInfoById(id : string){

        const user = await db.select( {id : usersTable.id,  fullName : usersTable.fullName , email : usersTable.email}).from(usersTable).where(eq(usersTable.id, id))

        if(!user || user.length === 0) throw new Error("User not found")
 
        return user[0]!
    }

    public async verifyAndDecodeUserToken(token: string){
        try {
            const result = JWT.verify(token , env.JWT_SECRET) as GenerateUserTokenPayloadType

            return result

        } catch (err) {
            throw new Error("Invalid token")
        }
    }
}