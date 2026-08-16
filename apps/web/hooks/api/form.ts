import { trpc } from "~/trpc/client"

export const  useCreateForm = () =>{
    const { 
        mutateAsync: createFormAsync,
        mutate : createForm ,
        error,
        failureCount,
        isError,
        isIdle,
        isSuccess,
        status,
    } = trpc.form.createForm.useMutation() // creating a mutation for creating a form, creating something on database
    return {
        createFormAsync,
        createForm ,
        error,
        failureCount,
        isError,
        isIdle,
        isSuccess,
        status,
    }
}