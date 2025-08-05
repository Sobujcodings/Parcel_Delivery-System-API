import z from "zod";

// user r property gula niye ashbo user interface theke then konta ki validation hobe sheta ekhane define korbo tarpor jokkhon user create hobe 'register' url diye in userRoute tokhon user create korar age validate kore nibo req.body k
export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too short minimum 2 character long" })
    .max(50, { message: "Name too long" }),
  email: z.string().email(),
  role: z.string({ invalid_type_error: "role must be string" }),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, {
      message: "Password must include one uppercase letter",
    })
    .regex(/\d/, { message: "Password must include at least one number" })
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
      message: "Password must include at least one special character",
    }),
  phone: z
    .string({ invalid_type_error: "Phone Number must be string" })
    .regex(/^01[3-9][0-9]{8}$/, {
      message:
        "Phone number must be a valid Bangladeshi number starting with 01 and 11 digits total",
    })
    .optional()
    .optional(),
  adress: z
    .string({ invalid_type_error: "Address must be string" })
    .max(200, { message: "Address cannot exceed 200 characters" })
    .optional(),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),
  isActive: z
    .boolean({ invalid_type_error: "isActive must be true or false" })
    .optional(),
  isVerified: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),
});
