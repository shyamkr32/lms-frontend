'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';

const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [resetPassword] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword({ variables: { token, newPassword: password } });
    alert('Password changed successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" placeholder="New Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Reset Password</button>
    </form>
  );
}
