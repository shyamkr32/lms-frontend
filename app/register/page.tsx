"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {z} from "zod";
import { toast,ToastContainer } from "react-toastify";

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      id
      email
    }
  }
`;

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [register] = useMutation(REGISTER);
  const [, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = RegisterSchema.safeParse(form);
    if (!validation.success) {
      const firstError = validation.error.issues[0].message;
      setError(firstError);
       toast('🦄 Registration failed', {
      position: "top-center",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    
      });
      return;
    }

    try {
      await register({ variables: form });
       toast('🦄 Registration succesful', {
      position: "top-center",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    
      });
      setError(null);
    } catch  {
      setError("Registration failed. Try again.");
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


      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-[300px] border p-1 rounded"
      />
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
      <button type="submit" className="w-[300px] border p-1 rounded bg-zinc-900">Register</button>
    </form>
  );
}
