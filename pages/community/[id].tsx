import type { NextPage } from 'next';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Answer, Post, User } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { cls } from '@libs/client/utils';
import { useEffect } from 'react';
import getDateTimeDiff from '@libs/client/getDateTimeDiff';

interface AnswerWithUser extends Answer {
  user: { name: string };
}

interface ReplyData {
  postId: number;
  answer: string;
}

interface PostWithData extends Post {
  answers: AnswerWithUser[];
  user: User;
  _count: { wonderings: number };
}

interface PostData {
  ok: boolean;
  post: PostWithData;
  isWondering: boolean;
}

interface AnswerData {
  ok: boolean;
  answerData: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: postData, mutate } = useSWR<PostData>(
    id ? `/api/posts/${id}` : null
  );
  const [uploadAnswer, { loading: answerLoading, data: answerData }] =
    useMutation<AnswerData>('/api/posts/answer');

  const [toggleWondering, { loading: toggleLoading, data: toggleData }] =
    useMutation(`/api/posts/${id}/wonder`);

  const onClickWondering = () => {
    if (toggleLoading) return;
    if (!postData) return;

    mutate(
      {
        ...postData,
        post: {
          ...postData?.post,
          _count: {
            ...postData?.post._count,
            wonderings: postData.isWondering
              ? postData?.post._count.wonderings - 1
              : postData?.post._count.wonderings + 1,
          },
        },
        isWondering: !postData.isWondering,
      },
      false
    );
    toggleWondering({});
  };

  const { register, handleSubmit, reset } = useForm<ReplyData>();
  const onValid = (data: ReplyData) => {
    if (answerLoading) return;
    if (!postData) return;

    data.postId = +id!;
    uploadAnswer(data);
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
    }
    reset();
    mutate();
  }, [answerData, reset]);
  return (
    <Layout canGoBack>
      <div>
        <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mb-3 flex cursor-pointer items-center space-x-3  border-b px-4 pb-3">
          <div className="h-10 w-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {postData?.post.user.name}
            </p>
            <Link href={`/profiles/${postData?.post?.userId}`}>
              <a className="text-xs font-medium text-gray-500">
                View profile &rarr;
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">Q.</span>{' '}
            {postData?.post?.question}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] px-4 py-2.5  text-gray-700">
            <button
              onClick={onClickWondering}
              className={cls(
                'flex items-center space-x-2 text-sm',
                postData?.isWondering ? 'text-green-400' : ''
              )}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {postData?.post?._count?.wonderings}</span>
            </button>
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {postData?.post.answers.length}</span>
            </span>
          </div>
        </div>
        {postData?.post?.answers?.map(
          (answer: AnswerWithUser, index: number) => (
            <div key={index} className="my-5 space-y-5 px-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-slate-200" />
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    {answer?.user.name}
                  </span>
                  <span className="block text-xs text-gray-500 ">
                    {getDateTimeDiff(answer?.createdAt)}
                  </span>
                  <p className="mt-2 text-gray-700">{answer?.answer}</p>
                </div>
              </div>
            </div>
          )
        )}

        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <TextArea
            register={register('answer', { required: true, minLength: 5 })}
            name="description"
            placeholder="Answer this question!"
            required
          />
          <button className="mt-2 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ">
            {answerLoading ? 'Loading...' : 'Reply'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
