import type { NextPage } from 'next';
import Layout from '@components/layout';
import Message from '@components/message';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Stream } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';

interface StreamMessage {
  message: string;
  id: number;
  userId: number;
  user: {
    avatar: string;
  };
}

interface StreamWithMessage extends Stream {
  user: { avatar: number };
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessage;
}

interface MessageForm {
  message: string;
}

const Stream: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      // refreshInterval: 1000,
    }
  );

  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );

  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const onValid = (formData: MessageForm) => {
    if (loading) {
      return;
    }
    reset();

    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev?.stream,
            messages: [
              ...prev?.stream.messages,
              {
                message: formData.message,
                id: data?.stream?.messages?.length
                  ? data?.stream?.messages?.length + 1
                  : 1,
                userId: data?.stream.userId,
                user: {
                  avatar: data?.stream.user.avatar,
                },
              },
            ],
          },
        } as any),
      false
    );

    sendMessage(formData);
  };

  return (
    <Layout canGoBack>
      <div className="space-y-4 py-10  px-4">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="mt-3 block text-2xl text-gray-900">
            ₩{data?.stream?.price.toLocaleString('ko-KR')}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16">
            {data?.stream?.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.userId === data?.stream?.userId}
              />
            ))}
          </div>
          <div className="fixed inset-x-0 bottom-0  bg-white py-2">
            <form
              onSubmit={handleSubmit(onValid)}
              className="relative mx-auto flex w-3/4  max-w-md items-center"
            >
              <input
                {...register('message', { required: true })}
                type="text"
                className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;