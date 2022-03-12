import { Product } from '@prisma/client';
import useSWR from 'swr';
import Item from './item';

interface ProductListProps {
  kind: 'loved' | 'saled' | 'purchased';
}

interface ProductWithCount extends Product {
  _count: { favorites: number };
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data?.[kind]?.map((record) => (
        <Item
          key={record?.id}
          id={record?.product?.id}
          title={record?.product?.name}
          price={record?.product?.price}
          hearts={record?.product._count.favorites}
        />
      ))}
    </>
  ) : null;
}
