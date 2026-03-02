"use client";

import { z } from "zod";
import { useState, useEffect } from "react";
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
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type LoginType = z.infer<typeof loginSchema>;
type RegisterType = z.infer<typeof registerSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  variant: initialVariant,
}) => {
  const [variant, setVariant] = useState<"login" | "register">(initialVariant);

  // Update variant if props change
  useEffect(() => {
    setVariant(initialVariant);
  }, [initialVariant]);

  const isLogin = variant === "login";

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
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
          onClose(); // Close modal
          reset(); // Reset form fields
        }
      } else {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Registration failed");

        toast.success("Registered successfully");
        setVariant("login"); // switch to login after register
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <Input placeholder="Name" {...formRegister("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
          )}

          <div>
            <Input placeholder="Email" {...formRegister("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...formRegister("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
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
  );
};

export default AuthModal;
