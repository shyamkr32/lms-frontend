// "use client";
// import { useState } from "react";
// import { gql, useMutation } from "@apollo/client";

// const FORGOT_PASSWORD = gql`
//   mutation ForgotPassword($email: String!) {
//     forgotPassword(email: $email)
//   }
// `;

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [forgotPassword] = useMutation(FORGOT_PASSWORD);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await forgotPassword({ variables: { email } });
//     alert("Reset link sent to email");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="m-20  border w-[400px] h-[280px] flex flex-col items-center justify-center gap-4 bg-zinc-800 mx-auto"
//     >
//       <input
//         type="email"
//         placeholder="Enter your email"
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-[300px] border p-1 rounded"
//       />
//       <button
//         type="submit"
//         className="w-[300px] border p-1 rounded bg-zinc-900"
//       >
//         Send Reset Link
//       </button>
//     </form>
//   );
// }
