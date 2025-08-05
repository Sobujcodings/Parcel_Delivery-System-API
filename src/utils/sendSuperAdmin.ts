import { envVars } from '../config/env';
import { IAuthProvider, Iuser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model"
import bycryptjs from "bcryptjs";

export const sendSuperAdmin = async() =>{
    try {
        const isSuperAdmin = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL});
        if (isSuperAdmin) {
            console.log('super admin already exist');
            return;
        }
        console.log('trying to create a super admin while starting the server');

        const saltRoundNumber = parseInt(envVars.BCRYPT_SALT_ROUND);
        const hashedPassword = await bycryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, saltRoundNumber);
        const authProvider : IAuthProvider = {
            provider : 'credentials',
            providerId: envVars.SUPER_ADMIN_EMAIL
        };
        const payload : Iuser = {
            name: "Admin",
            role: Role.ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password : hashedPassword,
            isVerified : true,
            auths: [authProvider]
        }

        const createdAdminUser = await User.create(payload);
        console.log('super admin created Successfully', createdAdminUser);
    } catch (error) {
        console.log(error);
    }
    return
}