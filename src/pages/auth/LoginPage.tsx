import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import AuthPageWrapper from "./_components/AuthPageWrapper";
import loginImage from "@/assets/images/login.png";
import logo from "@/assets/images/logo-2.png";
import AuthPageHeader from "./_components/AuthPageHeader";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema";

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      hospitalId: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await login(values).unwrap();

      // Save full response to Redux
      dispatch(setCredentials(res));

      toast.success(res.message);
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error(error);
      let message = "Login failed";
      if (error instanceof Error) {
        message = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "data" in error
      ) {
        const e = error as { data?: { message?: string } };
        if (e.data?.message) message = e.data.message;
      }
      toast.error(message);
    }
  }

  return (
    <AuthPageWrapper image={loginImage}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:w-6/12 flex-1 h-screen bg-white/80 backdrop-blur-xl 
        border-white/30 flex flex-col gap-6 items-start justify-center shadow-lg"
        >
          <AuthPageHeader
            title="HealthAi"
            description="AI-driven health analysis, smarter and faster."
            image={logo}
          />

          <div className="flex flex-col gap-5 w-full px-8 md:px-12 lg:px-40">
            <FormField
              control={form.control}
              name="hospitalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600"> Hospital-ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your created login-id eg hcs12345"
                      {...field}
                    />
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
                  <FormLabel className="text-slate-600">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="px-8 md:px-12 lg:px-40 w-full">
            <Button
              className="w-[150px] bg-cyan-600 hover:bg-cyan-700 py-4 rounded-lg text-white text-md font-medium transition disabled:opacity-50 mx-auto"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </AuthPageWrapper>
  );
}
