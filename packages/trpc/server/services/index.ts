import UserService from "@repo/services/user" // importing the UserService class from the user service module
import FormService from "@repo/services/form"
import FormFieldService from "@repo/services/form-field"
import FormSubmissionService from "@repo/services/form-submission"
export const userService = new UserService() // creating an instance of the UserService class and exporting it for use in other parts of the application

export const formService = new FormService()
export const formFieldService = new FormFieldService()
export const formSubmissionService = new FormSubmissionService()