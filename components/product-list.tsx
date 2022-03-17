import { Product, Record } from '@prisma/client';
import useSWR from 'swr';
import Item from './item';

interface ProductListProps {
  kind: 'Favorite' | 'Sale' | 'Purchase';
}

interface ProductWithCount extends Product {
  _count: { records: number };
}

interface RecordWithProduct extends Record {
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: RecordWithProduct[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(
    `/api/users/me/records/?kind=${kind}`
  );
  return data ? (
    <>
      {data?.records?.map((record) => (
        <Item
          key={record?.id}
          id={record?.productId}
          title={record?.product?.name}
          price={record?.product?.price}
          hearts={record?.product._count.records}
        />
      ))}
    </>
  ) : null;
}
