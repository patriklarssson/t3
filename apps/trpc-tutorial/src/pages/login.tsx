import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateUserInput } from '../schema/user.schema';
import { trpc } from '../utils/trpc';

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const { mutate, error } = trpc.useMutation(['users.request-otp'], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    mutate(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}

        {success && <p>Check your email</p>}
        <h1>Login</h1>

        <input
          type={'email'}
          placeholder="jane@doe@example.com"
          {...register('email')}
        />
        <button type={'submit'}>Login</button>
      </form>

      <Link href="/register">Register</Link>
    </>
  );
}

export default RegisterPage;
