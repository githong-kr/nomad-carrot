import type { NextPage } from 'next';
import Button from '@components/button';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { Post } from '@prisma/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useCoords from '@libs/client/useCoords';

interface WriteForm {
  question: string;
}

interface MutationResult {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [uploadPost, { loading, data }] =
    useMutation<MutationResult>('/api/posts');

  const onValid = (data: WriteForm) => {
    if (loading) return;

    uploadPost({ ...data, latitude, longitude });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 p-4">
        <TextArea
          required
          register={register('question', { required: true, minLength: 5 })}
          placeholder="Ask a question!"
        />
        <Button text={loading ? 'Loading...' : 'Submit'} />
      </form>
    </Layout>
  );
};

export default Write;
