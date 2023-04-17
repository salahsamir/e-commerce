import { Roles } from "../../middleware/auth.js";


export const endPoint={
    create:[Roles.Admin],
    delete:[Roles.Admin]
}
