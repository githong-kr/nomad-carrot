import type { NextPage } from 'next';
import Item from '@components/item';
import Layout from '@components/layout';
import useSWR from 'swr';
import { Favorite, Product } from '@prisma/client';

interface FavoriteWithProduct extends Favorite {
  product: Product;
}

interface LovedResponse {
  ok: boolean;
  favProducts: FavoriteWithProduct[]
}

const Loved: NextPage = () => {
  const { data } = useSWR<LovedResponse>(`/api/profile/loved`);

  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 divide-y  pb-10">
        {data?.favProducts.map((favProduct) => (
          <Item
            key={favProduct?.id}
            id={favProduct?.productId}
            title={favProduct?.product?.name}
            price={favProduct?.product?.price}
            comments={1}
            hearts={1}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Loved;
