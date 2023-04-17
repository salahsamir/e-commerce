import { Roles } from "../../middleware/auth.js";


export const endPoint={
    create:[Roles.User],
    update:[Roles.User],
    update_status:[Roles.Admin],


}