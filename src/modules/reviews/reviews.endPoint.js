import { Roles } from "../../middleware/auth.js";


export const endPoint={
    create:[Roles.User],
    update:[Roles.User],

}