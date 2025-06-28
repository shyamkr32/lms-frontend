"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { toast,ToastContainer } from "react-toastify";

// Define Zod schema for login form
const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//  GraphQL mutation
const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = LoginSchema.safeParse(form);
    if (!validation.success) {
      const firstError = validation.error.issues[0].message;
      toast('🦄 log in failed', {
      position: "top-center",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    
      });
      setError(firstError);
      return;
    }

    try {
      const { data } = await login({ variables: form });
      if (data?.login?.token) {
        localStorage.setItem("token", data.login.token);
        router.push("/");
      } else {
        setError("Invalid login credentials.");
        toast('🦄 Invalid login credentials', {
      position: "top-center",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    
      });
      }
    } catch (err: any) {
      setError("Login failed. Try again.");
       toast('🦄 Login failed. Try again.', {
      position: "top-center",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-20  border w-[400px] h-[280px] flex flex-col items-center justify-center gap-4 bg-zinc-800 mx-auto"
    >

<ToastContainer
position="top-center"
autoClose={700}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>



      <h1>Log in</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-[300px] border p-1 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-[300px] border p-1 rounded"
      />
      <button
        type="submit"
        className="w-[300px] border p-1 rounded bg-zinc-900"
      >
        Login
      </button>
      <div className="flex gap-16">
        <span>Don't have an account?</span>
        <Link href={"/register"}>
          <div className="underline">Register</div>
        </Link>
      </div>
      <Link href={"/forgotpassword"}><div className="underline">Forgot password</div></Link>
    </form>
  );
}
