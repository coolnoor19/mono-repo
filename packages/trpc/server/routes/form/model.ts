// yeh file for creating procedures and models for how its going to look like in trpc

import {z} from "zod" 

export const createFormInputModel = z.object({
    title:z.string().max(50).describe("Title of the form"),
    description:z.string().max(350).optional().describe("Description of the form")
})

export const createFormOutputModel = z.object({
    id: z.string().describe("The id of createdform")
})