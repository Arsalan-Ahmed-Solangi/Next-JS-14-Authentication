import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { connectDB } from "@/lib/utils";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { User } from "@/models/UserModel";
import { auth, signIn } from "@/auth";
import { toast } from "sonner";
import LoginForm from "@/components/clients/form";

async function  page() {
  const session = await auth();
        if(session?.user) redirect("/")
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Login </CardTitle>
        </CardHeader>
        <CardContent>
            <LoginForm/>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>OR</span>
        
         
          <Link className="mt-2" href="/signup">
            {" "}
            Dont have an account? Signup
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default page;
