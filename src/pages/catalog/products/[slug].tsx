import { useRouter } from "next/router";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Prismic from "prismic-javascript";
import PrismicDOM from "prismic-dom";
import { Document } from "prismic-javascript/types/documents";
import Link from "next/link";
import { client } from "@/lib/prismic";
import { GetStaticPaths, GetStaticProps } from "next";
// const AddToCartModal = dynamic(
//   () => import('@/components/AddToCartModal'),
//   { loading: () => <p>Loading...</p>, ssr: false }
// )

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  // const [isAddToCartModalVisible, setIsToCartModalVisible] = useState(false);

  // function handleAddtoCart() {
  //   setIsToCartModalVisible(true);
  // }

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

      <img src={product.data.thumbnail.url} width="450" alt={product.data.title}/>

      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDOM.RichText.asHtml(product.data.description),
        }}
      ></div>

      <p>Price: ${product.data.price}</p>

      {/* <button onClick={handleAddtoCart}>Add to cart</button> */}

      {/* {isAddToCartModalVisible && <AddToCartModal />} */}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID("product", String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  };
};
