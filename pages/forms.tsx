import { NextPage } from 'next';
import { FieldErrors, useForm } from 'react-hook-form';

// Less Code (checked)
// Better validation
// Better Errors (set, clear, display)
// Have control over inputs
// Don't deal with events (checked)
// Easier Inputs (checked)

interface LoginForm {
  email: string;
  password: string;
}

const Forms: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onChange' });

  const onValid = (data: LoginForm) => {
    console.log(data);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="flex flex-col space-y-5 mt-5"
      >
        <input
          {...register('email', {
            required: `Email is required`,
            minLength: {
              message: 'The Email should be longer than 5 chars',
              value: 5,
            },
          })}
          type="email"
          placeholder="email"
        />
        <input
          {...register('password', {
            required: `Password is required`,
            minLength: {
              message: 'The Password should be longer than 5 chars',
              value: 5,
            },
          })}
          type="password"
          placeholder="pw"
        />
        <input type="submit" value="Submit" />
      </form>
      {errors.email?.message}
      {errors.password?.message}
    </div>
  );
};

export default Forms;
