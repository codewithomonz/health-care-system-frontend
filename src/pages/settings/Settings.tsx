import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateUserProfileMutation } from "@/features/users/userApiSlice";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/features/store";
import { setCredentials } from "@/features/auth/authSlice";

// ✅ Schema (only updating name, hospitalId shown as read-only)
const settingsSchema = z.object({
  _id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  hospitalId: z.string(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { user, accessToken, refreshToken, expiresAt } = useSelector(
    (state: RootState) => state.auth
  );

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      _id: user?._id,
      name: user?.name,
      hospitalId: user?.hospitalId,
    },
  });

  useEffect(() => {
    form.reset({
      _id: user?._id,
      name: user?.name,
      hospitalId: user?.hospitalId,
    });
  }, [user, form]);

  // const onSubmit = async (values: SettingsFormValues) => {
  //   try {
  //     await updateUserProfile({ name: values.name }).unwrap(); // ✅ only send name

  //     if (res.data) {
  //       dispatch(
  //         setCredentials({
  //           user: res.data, // 👈 single user, not array
  //           accessToken,
  //           refreshToken,
  //           expiresAt,
  //         })
  //       );
  //     }

  //     toast.success("Profile updated successfully!");
  //   } catch (err: unknown) {
  //     const getMessageFromError = (e: unknown): string | undefined => {
  //       if (typeof e === "object" && e !== null && "data" in e) {
  //         const maybeData = (e as { data?: unknown }).data;
  //         if (
  //           typeof maybeData === "object" &&
  //           maybeData !== null &&
  //           "message" in maybeData
  //         ) {
  //           const msg = (maybeData as { message?: unknown }).message;
  //           return typeof msg === "string" ? msg : undefined;
  //         }
  //       }
  //       if (typeof e === "object" && e !== null && "message" in e) {
  //         const msg = (e as { message?: unknown }).message;
  //         return typeof msg === "string" ? msg : undefined;
  //       }
  //       if (typeof e === "string") return e;
  //       return undefined;
  //     };

  //     const message = getMessageFromError(err) ?? "Failed to update profile";
  //     toast.error(message);
  //   }
  // };

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      const res = await updateUserProfile({ name: values.name }).unwrap(); // ✅ assign result

      if (res.data) {
        dispatch(
          setCredentials({
            user: res.data, // 👈 single user, not array
            accessToken,
            refreshToken,
            expiresAt,
          })
        );
      }

      toast.success(res.message || "Profile updated successfully!");
    } catch (err: unknown) {
      const getMessageFromError = (e: unknown): string | undefined => {
        if (typeof e === "object" && e !== null && "data" in e) {
          const maybeData = (e as { data?: unknown }).data;
          if (
            typeof maybeData === "object" &&
            maybeData !== null &&
            "message" in maybeData
          ) {
            const msg = (maybeData as { message?: unknown }).message;
            return typeof msg === "string" ? msg : undefined;
          }
        }
        if (typeof e === "object" && e !== null && "message" in e) {
          const msg = (e as { message?: unknown }).message;
          return typeof msg === "string" ? msg : undefined;
        }
        if (typeof e === "string") return e;
        return undefined;
      };

      const message = getMessageFromError(err) ?? "Failed to update profile";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold mb-6 text-center">Settings</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Hospital ID (read-only) */}
          <FormField
            control={form.control}
            name="hospitalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital ID</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-gray-100" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Name (editable) */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your full name"
                    className="border rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsPage;
