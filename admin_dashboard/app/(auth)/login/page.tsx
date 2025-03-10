"use client";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  HospitalIcon,
  Loader2,
  LockIcon,
  LogIn,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/app/hooks";
import { useUserStore } from "@/app/store";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  hospitalCode: z.string().min(6, {
    message: "Hospital code must be at least 3 characters.",
  }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      hospitalCode: "",
    },
  });
  const user = useUserStore();
  const navigate = useRouter();

  const login = useLogin();

  function onSubmit(values: z.infer<typeof formSchema>) {
    login.mutate(values, {
      onSuccess: (data) => {
        user.setUser(data);
        toast("Login successful");
        navigate.replace("/");
      },
      onError: () => {
        toast("username or password incorrect");
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-sky-200 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-neutral-800 p-2">
              <LogIn className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold">MedSync</span>
          </div>
        </div>
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-100">
              <LogIn className="size-6" />
            </div>
            <CardTitle className="text-2xl">Sign in with email</CardTitle>
            <CardDescription>
              Manage hospital operations, patients, staff, appointments
              <br />
              and payments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 size-5 text-neutral-400" />
                          <Input
                            placeholder="Email"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-3 size-5 text-neutral-400">
                            <LockIcon />
                          </div>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="pl-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="size-5 text-neutral-400" />
                            ) : (
                              <Eye className="size-5 text-neutral-400" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hospitalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-3 size-5 text-neutral-400">
                            <HospitalIcon />
                          </div>
                          <Input
                            placeholder="Hospital Code (111111)"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div className="flex justify-end"> */}
                {/*   <Link */}
                {/*     href="/forgot-password" */}
                {/*     className="text-sm text-blue-600 hover:underline" */}
                {/*   > */}
                {/*     Forgot password? */}
                {/*   </Link> */}
                {/* </div> */}
                <Button
                  type="submit"
                  className="w-full bg-neutral-900 hover:bg-neutral-800"
                >
                  {login.isPending ? (
                    <Loader2 className="anmate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
