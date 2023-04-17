import { Roles } from "../../middleware/auth.js";


export const endPoint={
    create_coupon:[Roles.Admin],
    update_coupon:[Roles.Admin]
}