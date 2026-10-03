import z from "zod"
export const UserRegisterDTO = z
  .object({
    firstName: z.string().nonempty("First Name is required").nonoptional(),
    lastName: z.string().nonempty("Last Name is required").nonoptional(),
    email: z.email().nonempty("Email is required").nonoptional(),
    username: z
      .string()
      .min(5, "Username should have atleast 5 characters")
      .max(20, "Username should not exceed 20 characters")
      .nonempty("Username is required")
      .nonoptional(),
    gender: z.string().nonempty("Gender is required").nonoptional(),
    phone: z.string().nonempty("Phone is required").nonoptional(),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,32}$/, "Password must follow strong password rule")
      // .regex(/[a-z]/, "Password must include at least 1 small letter")
      // .regex(/[A-Z]/, "Password must include at least 1 capital letter")
      // .regex(/[0-9]/, "Password must include at least 1 number")
      // .regex(/[^a-zA-Z0-9]/, "Must include at least 1 special character")
      // .min(8, "Password must be of at least 8 character long")
      // .max(32, "Password must not exceed 32 characters length")
      .nonempty("Password is required")
      .nonoptional(),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password is required")
      .nonoptional(),
    birthDate: z.string().nonempty("DOB is required").nonoptional(),
    address: z.object({
      address: z.string().nonempty("Adress is required").nonoptional(),
      city: z.string().nonempty("City is required").nonoptional(),
      state: z.string().nonempty("State is required").nonoptional(),
      country: z.string().nonempty("Country is required").nonoptional(),
    }),
    // university: z.string().nonempty().nonoptional(),
    role: z.string().nonempty("Role is required").nonoptional(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Password and confirm password must match",
    path: ["confirmPassword"],
  });


  export const LoginDTO = z.object({
  //email: z.string().email("Please enter a valid email address."),
  username: z.string().min(4,"Username must be at least 4 characters long").max(32,"Username must not exceed 32 characters"),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});