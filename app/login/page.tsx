"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await login({ variables: form });
    if (data?.login?.token) {
      localStorage.setItem("token", data.login.token);
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-20  border w-[400px] h-[280px] flex flex-col items-center justify-center gap-4 bg-zinc-800 mx-auto"
    >
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
