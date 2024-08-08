"use server";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const signHandler = async (email: string, password: string) => {
 
  try {
    await signIn("credentials", {
      email,
      password,
      // redirect:true,
      // redirectTo:"/"
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    const err = error as CredentialsSignin;
    return err.cause;
  }
};

export { signHandler };
