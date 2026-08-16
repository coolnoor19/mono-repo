import {z} from "zod"

export const createFormInput = z.object({
    title: z.string().max(50).describe("Title of the form"),
    description: z.string().max(350).optional().describe("Description of the form"),
    createdBy: z.uuid().describe("UUID of the creator")
})

export type CreateFormInputType = z.infer<typeof createFormInput>

// listFormByUserId so form we display on dashboard

export const listFormsByUserIdInput = z.object({
    userId: z.string().describe("UUID of the user")
})

export type ListFormByUserIdType = z.infer<typeof listFormsByUserIdInput>