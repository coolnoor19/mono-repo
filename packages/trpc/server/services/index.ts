import UserService from "@repo/services/user" // importing the UserService class from the user service module
import FormService from "@repo/services/form"

export const userService = new UserService() // creating an instance of the UserService class and exporting it for use in other parts of the application

export const formService = new FormService()