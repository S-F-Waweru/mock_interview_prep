"use client";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";

const authFormSchema = (type:FormType) => {
return z.object({
    name : type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email : z.string().email(),
    password : z.string().min(3),
})
}

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

const AuthForm = ({type}:{type :FormType}) => {

  const isSignIn = type === 'sign-in'
    const formSchema =  authFormSchema(type)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password :"",
    },
  });

  // 2. Define a submit handler. 
  function onSubmit(values: z.infer<typeof formSchema>) {
   try {
    if(type === "sign-up"){
        console.log("Sign up", values)
    }else{
        console.log("Sign in", values)

    }
   } catch (error) {
    console.log(error)
    toast.error(`There was an error: ${error}.`)
   }
  }return (
    <div className="card-border lg:max-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={32} height={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
  
        <h3>Practice Job Interviews With AI</h3>
      
        <Form {...form}>
          <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }} 
          className="w-full space-y-6 mt-4 form">
              {!isSignIn && <p>Name</p>}
              <p>Email</p>
              <p>Password</p>
  
          
            <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Have an account yet?" : "Create an Account"}
          <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
              {!isSignIn ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
  
      </div>
      </div>
    );


  return (
    <div className="card-border lg:max-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={32} height={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice Job Interviews With AI</h3>
    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="w-full space-y-6 mt-4 form">
            {!isSignIn && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>

        
          <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
        </form>
      </Form>
      <p className="text-center">
        {isSignIn ? "Have an account yet?" : "Create an Account"}
        <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
            {!isSignIn ? 'Sign In' : 'Sign Up'}
        </Link>
      </p>

    </div>
    </div>
  );
};


export default AuthForm;
