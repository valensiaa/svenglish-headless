import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import sanityClient from "../client.js";

import { MyCustomPortableText } from "../components/shared/CustomPortableText.jsx";

import imageUrlBuilder from "@sanity/image-url";
import { LangReceiver } from "../components/shared/LangReceiver.jsx";

const builder = imageUrlBuilder(sanityClient);

const ProductDetails = () => {
  const [productInfo, setProductInfo] = useState(null);
  let { productSlug } = useParams();

  let { lang, pathname } = LangReceiver();
  lang = pathname.indexOf("/en/") > -1 ? "en" : "fr";

  const slugVar = lang === "en" ? "slugEn" : "slug";

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "productType" && ${slugVar}.current == "${productSlug}"]{
            _id,
            "productTitle": productTitle.${lang},
            "productContentDetails": productContentDetails.${lang},
            productHeroImage{
                asset->{
                    _id,
                    url
                }
            }
        }`
      )
      .then((data) => setProductInfo(data))
      .catch(console.error);
  }, [productSlug, lang, slugVar]);

  const setUrl = (source) => {
    return builder.image(source);
  };

  return (
    <section className="c-product-info flex-auto">
      {productInfo && (
        <>
          <div
            className="c-hero bg-ivory flex flex-col items-center w-full pb-[theme(spacing.72)] pt-[theme(spacing.72)]"
            style={{
              background: productInfo[0].productHeroImage
                ? `url(${setUrl(productInfo[0].productHeroImage).url()})`
                : "#365b6d",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          >
            <div className="container">
              <h1 className="c-product-info__title relative font-bold text-ivory text-5xl">
                {productInfo[0].productTitle}
              </h1>
            </div>
          </div>
          <div className="container mx-auto">
            <div className="c-product-info__content py-[theme(spacing.56)]">
              <MyCustomPortableText
                paragraphClasses="font-serif text-base text-navy_blue font-light leading-6 w-full max-w-3xl"
                ulClasses="my-[theme(spacing.24)] ml-[theme(spacing.16)]"
                liClasses="text-base text-navy_blue font-light leading-6 w-full pl-16 max-w-3xl"
                headerClasses="font-bold text-navy_blue text-lg max-w-3xl"
                strongClasses="font-bold text-navy_blue"
                value={productInfo[0].productContentDetails}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default ProductDetails;
