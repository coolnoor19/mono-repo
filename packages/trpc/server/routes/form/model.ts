// yeh file for creating procedures and models for how its going to look like in trpc

import {z} from "zod" 
import { fieldOutputModel } from "../form-field/model"

export const createFormInputModel = z.object({
    title:z.string().max(50).describe("Title of the form"),
    description:z.string().max(350).optional().describe("Description of the form")
})

export const createFormOutputModel = z.object({
    id: z.string().describe("The id of createdform")
})

export const listFormsInputModel = z.undefined()
export const listFormsOutputModel = z.array(z.object({
    id: z.string().describe("The id of createdform"),
    title:z.string().max(50).describe("Title of the form"),
    description:z.string().max(350).nullable().optional().describe("Description of the form"),

    createdAt: z.date().nullable().describe("Creation date of form"),
    updatedAt: z.date().nullable().describe("Update date of form")
}))

export const getFormInputModel = z.object({
    formId: z.uuid().describe("UUID of the form to fetch"),
});

export const getFormOutputModel = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    fields: z.array(fieldOutputModel),
});
