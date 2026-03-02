"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/lib/validations/authSchema";
import { z } from "zod";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type LoginType = z.infer<typeof loginSchema>;
type RegisterType = z.infer<typeof registerSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: "login" | "register";
}

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<"login" | "register">("login");

  const isLogin = variant === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType | RegisterType>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (res?.error) {
          toast.error("Invalid credentials");
        } else {
          toast.success("Logged in successfully");
          setIsOpen(false);
        }
      } else {
        const response = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Registration failed");

        toast.success("Registered successfully");
        setVariant("login");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Login</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div>
                <Input placeholder="Name" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
            )}

            <div>
              <Input placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>

          <div className="my-4 text-center text-sm text-gray-500">or</div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </Button>

          <div className="text-center text-sm mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setVariant(isLogin ? "register" : "login")}
              className="text-rose-500 ml-1 cursor-pointer"
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModal;
