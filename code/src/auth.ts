import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { User } from "./models/UserModel";
import { compare } from "bcryptjs";
import { connectDB } from "./lib/utils";
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [


    CredentialProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email Address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as String | undefined;
        const password = credentials.password as String | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide email and password");
        }


        //****ConnectionWithDatabase*******//
        connectDB();

        const user = await User.findOne({
            email
        }).select("+password");
        if(!user){
            throw new CredentialsSignin({ cause:"Invalid Credentials" });
        }

        if(!user.password){
            throw new CredentialsSignin({cause:"Invalid Credentials"});
        }
        const isMatched =  await compare(password,user.password);
        if(!isMatched){
            throw new CredentialsSignin({ cause:"Invalid Credentials"});
        }
        // if(!user.verified){
        //     throw new CredentialsSignin("Please verify your email");
        // }
        return { name:user.name,email:user.email,id:user._id };
      },
    }),
  ],
  pages:{
    signIn:"/login"
  }
});

// auth().then((value) => {

// });
