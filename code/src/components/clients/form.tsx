"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signHandler } from "@/actions/login";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const LoginForm = ()=>{


    const router = useRouter();
    return ( <>
    <form
            action={async (formData) => {
              const email = formData.get("email") as String | any;
              const password = formData.get("password") as String | any;

              if (!email || !password) return  toast.error("Please provide all fields");
              const toastId = toast.loading("Logging In");

              const error:any = await signHandler(email,password);
              if(!error){
                toast.success("Login Successfull",{
                    id:toastId
                })
                router.refresh();
              } else{
                toast.error(error,{
                    id:toastId
                })
              }
            }}
            className="flex flex-col gap-4"
          >
            <Input type="email" name="email" placeholder="Email Address" />
            <Input type="password" name="password" placeholder="Password" />
            <Button type="submit">Button</Button>
          </form>
    
    </> )
}

export default LoginForm;