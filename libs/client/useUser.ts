import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function useUser(isPublic: boolean = false) {
  if (!isPublic) {
    const fetcher = (url: string) =>
      fetch(url).then((response) => response.json());
    const { data, error } = useSWR('/api/users/me', fetcher);

    const router = useRouter();
    useEffect(() => {
      if (data && !data.ok) {
        console.log(data);
        router.replace('/enter');
      }
    }, [data, router]);
    return { user: data?.profile, isLoading: !data && !error };
  } else {
    return { user: {}, isLoading: false };
  }
}
