import { Title } from "../styles/pages/Home";
 

import { GetServerSideProps } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";
import PrismicDOM from "prismic-dom";

interface IProducts {
  id: number;
  title: String;
}

interface HomeProps {
  // recommendedProducts: IProducts[];
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {



    // async function handleSum (){
    //   const { sum } = (await import("../lib/math")).default;
    //   alert(sum(1,2));
    // }  

  return (
    <div>
      <SEO
      image="boost.png"
      title="DevCommerce, yout best ecommerce!"
      shouldExludeTitleSufflix />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                     
                  </a>
                </Link >
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  // const recommendedProducts = await response.json();

  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
