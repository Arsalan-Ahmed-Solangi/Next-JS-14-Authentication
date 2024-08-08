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
import { User } from "@/models/UserModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/utils";
function page() {

    const signUp  = async (formData: FormData) => {
        "use server";

        const name = formData.get("name") as String | undefined;
        const email = formData.get("email") as String | undefined;
        const password = formData.get("password") as String | undefined;

        if (!name || !email || !password) {
          throw new Error("Please provide all fields");
        }   


        await connectDB();    

        const user = await User.findOne({ email });
        if (user) throw new Error("User already exists");
        const hashPassword = await hash(password, 10);
       await  User.create({
          name,
          email,
          password: hashPassword,
        });
        redirect("/login")
      }
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Sign Up </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={signUp}
            className="flex flex-col gap-4"
          >
            <Input type="text" placeholder="Name" name="name" />
            <Input type="email" placeholder="Email Address" name="email" />
            <Input type="password" placeholder="Password" name="password" />
            <Button type="submit">Button</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>OR</span>
          <form action={""}>
            <Button type="submit" variant={"outline"}>
              Login With Google
            </Button>
          </form>
          <Link className="mt-2" href="/login">
            {" "}
            Already have an account? Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default page;
