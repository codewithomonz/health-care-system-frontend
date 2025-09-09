// import { useState } from "react";
// import { useAuthActions } from "@/hooks/useAuthActions";

// import AuthPageWrapper from "./_components/AuthPageWrapper";
// import loginImage from "@/assets/images/login.png";
// import logo from "@/assets/images/logo-2.png";
// import AuthPageHeader from "./_components/AuthPageHeader";

// export default function Signup() {
//   const { register, registerStatus } = useAuthActions();
//   const [form, setForm] = useState({
//     name: "",
//     hostpitalId: "",
//     password: "",
//     passwordConfirmation: "",
//   });

//   return (
//     <AuthPageWrapper image={loginImage}>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           register(form);
//         }}
//         className="w-full md:w-6/12 flex-1 h-screen bg-white/60 backdrop-blur-xl border-white/30 flex flex-col gap-6 items-start justify-center shadow-lg overflow-auto py-20"
//       >
//         <AuthPageHeader
//           title="HealthAi"
//           description="Get instant AI-driven analysis of your symptoms, track your health, and connect with trusted professionals. Your health, smarter."
//           image={logo}
//         />

//         <div className="flex flex-col gap-5 w-full px-8 md:px-20">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-slate-700 mb-1"
//             >
//               Fullname
//             </label>
//             <input
//               id="name"
//               type="text"
//               disabled={registerStatus === "pending"}
//               placeholder="Enter a random fullname eg: John Doe "
//               className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-slate-700 mb-1"
//             >
//               Hospital ID
//             </label>
//             <input
//               id="hospitalId"
//               type="text"
//               disabled={registerStatus === "pending"}
//               placeholder="Enter choose hospital ID eg : hp12345 "
//               className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
//               value={form.hostpitalId}
//               onChange={(e) =>
//                 setForm({ ...form, hostpitalId: e.target.value })
//               }
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-slate-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               disabled={registerStatus === "pending"}
//               placeholder="Enter your password"
//               className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-slate-700 mb-1"
//             >
//               Confirm Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               disabled={registerStatus === "pending"}
//               placeholder="Enter password confirmation"
//               className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
//               value={form.passwordConfirmation}
//               onChange={(e) =>
//                 setForm({ ...form, passwordConfirmation: e.target.value })
//               }
//               required
//             />
//           </div>
//         </div>

//         <div className="px-8 md:px-20">
//           <button type="submit" disabled={registerStatus === "pending"}>
//             {registerStatus === "pending" ? "Registering..." : "Register"}
//           </button>
//         </div>
//       </form>
//     </AuthPageWrapper>
//   );
// }

import { useState } from "react";
import { useAuthActions } from "@/hooks/useAuthActions";

import AuthPageWrapper from "./_components/AuthPageWrapper";
import loginImage from "@/assets/images/login.png";
import logo from "@/assets/images/logo-2.png";
import AuthPageHeader from "./_components/AuthPageHeader";

// simple password strength checker
function getPasswordStrength(password: string) {
  if (password.length < 6) return "Weak";
  if (
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  )
    return "Strong";
  return "Medium";
}

export default function SignupPage() {
  const { register, registerStatus, registerError } = useAuthActions();
  const [form, setForm] = useState({
    name: "",
    hostpitalId: "",
    password: "",
    passwordConfirmation: "",
  });
  const [strength, setStrength] = useState("");

  const handlePasswordChange = (value: string) => {
    setForm({ ...form, password: value });
    setStrength(getPasswordStrength(value));
  };

  return (
    <AuthPageWrapper image={loginImage}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (form.password !== form.passwordConfirmation) {
            alert("Passwords do not match!");
            return;
          }
          try {
            await register(form);
          } catch (err) {
            // handled by registerError
            console.log(err);
          }
        }}
        className="w-full md:w-6/12 flex-1 h-screen bg-white/60 backdrop-blur-xl 
        border-white/30 flex flex-col gap-6 items-start justify-center shadow-lg overflow-auto py-20"
      >
        <AuthPageHeader
          title="HealthAi"
          description="AI-driven health analysis, smarter and faster."
          image={logo}
        />

        <div className="flex flex-col gap-5 w-full px-8 md:px-20">
          <input
            id="name"
            type="text"
            placeholder="Enter fullname"
            disabled={registerStatus === "pending"}
            className="w-full p-3 rounded-lg border border-slate-300"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            id="hospitalId"
            type="text"
            placeholder="Choose hospital ID (eg: hp12345)"
            disabled={registerStatus === "pending"}
            className="w-full p-3 rounded-lg border border-slate-300"
            value={form.hostpitalId}
            onChange={(e) => setForm({ ...form, hostpitalId: e.target.value })}
            required
          />

          <div>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              disabled={registerStatus === "pending"}
              className="w-full p-3 rounded-lg border border-slate-300"
              value={form.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
            />
            {form.password && (
              <p
                className={`text-sm mt-1 ${
                  strength === "Weak"
                    ? "text-red-500"
                    : strength === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Password strength: {strength}
              </p>
            )}
          </div>

          <input
            id="passwordConfirmation"
            type="password"
            placeholder="Confirm password"
            disabled={registerStatus === "pending"}
            className="w-full p-3 rounded-lg border border-slate-300"
            value={form.passwordConfirmation}
            onChange={(e) =>
              setForm({ ...form, passwordConfirmation: e.target.value })
            }
            required
          />
        </div>

        <div className="px-8 md:px-20 w-full">
          {registerError && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {registerError.message || "Registration failed"}
            </p>
          )}

          <button
            type="submit"
            disabled={registerStatus === "pending"}
            className="w-[150px] bg-cyan-600 hover:bg-cyan-700 py-3 rounded-lg text-white text-lg font-medium transition disabled:opacity-50 mx-auto block"
          >
            {registerStatus === "pending" ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </AuthPageWrapper>
  );
}
