"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ variables: form });
    alert("Registration Successful");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-20  border w-[400px] h-[280px] flex flex-col items-center justify-center gap-4 bg-zinc-800 mx-auto"
    >
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
