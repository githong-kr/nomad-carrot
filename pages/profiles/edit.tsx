import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { User } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';

interface EditProfileForm {
  name: string;
  email?: string;
  phone?: string;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage<User> = (props) => {
  const { email, phone, id, name } = props;
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();
  const router = useRouter();

  useEffect(() => {
    if (email) setValue('email', email);
    if (phone) setValue('phone', phone);
    if (name) setValue('name', name);
  }, [props, setValue]);

  const [editProfile, { data, loading, error }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/profiles/${id}`);
    }
    if (data && !data.ok) {
      setError('formErrors', { message: data.error });
    }
  }, [data, setError]);

  const onValid = ({ name, email, phone }: EditProfileForm) => {
    if (loading) return;

    if (!email && !phone) {
      setError('formErrors', {
        message: 'Email or Phone are required! You need to choose one!',
      });
      return;
    }

    if (!name) {
      setError('formErrors', {
        message: 'Nmae is required!',
      });
      return;
    }

    editProfile({ name, email, phone });
  };

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register('name')}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register('email')}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register('phone')}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <div className="my-2 text-red-500 font-medium text-center">
            {errors.formErrors.message}
          </div>
        ) : null}
        <Button text={loading ? 'Loading...' : 'Update profile'} />
      </form>
    </Layout>
  );
};

export default EditProfile;
