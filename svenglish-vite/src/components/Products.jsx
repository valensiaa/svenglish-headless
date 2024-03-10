import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";

import { LangReceiver } from "../components/shared/LangReceiver.jsx";
import imageUrlBuilder from "@sanity/image-url";
import { MyCustomPortableText } from "./shared/CustomPortableText.jsx";

const builder = imageUrlBuilder(sanityClient);

const ProductsSection = ({ titleSection, anchorSection, iconSection }) => {
  const [products, setProducts] = useState(null);

  const { lang } = LangReceiver();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=='productType']{
        _id,
            "productTitle": productTitle.${lang},
            'productSubTitle': productSubTitle.${lang},
            productIcon{
                asset->{    
                    _id,
                    url
                    },
                alt
            },
            "productContent": productContent.${lang},
            slug,
            slugEn
        }`
      )
      .then((data) => setProducts(data))
      .catch(console.error);
  }, [lang]);

  const setUrl = (source) => {
    return builder.image(source);
  };

  return (
    <section
      className="c-products py-[theme(spacing.56)] bg-ivory"
      id={anchorSection}
    >
      <div className="container mx-auto">
        {titleSection && (
          <div className="c-title-section__wrapper">
            <h2 className="c-products__title text-4xl text-navy_blue lowercase border border-x-0 border-t-0 border-solid border-b-navy_blue pb-[theme(spacing.16)] flex-auto">
              {titleSection}
            </h2>
            <img
              className="c-title-section__icon"
              src={iconSection ? setUrl(iconSection).url() : ""}
              alt={titleSection}
            />
          </div>
        )}

        <div className="c-products__wrapper grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 my-[theme(spacing.40)]  align-stretch">
          {products &&
            products.map((product) => (
              <Link
                key={product._id}
                to={
                  lang === "en"
                    ? `products/${product.slugEn && product.slugEn.current}`
                    : `produits/${product.slug && product.slug.current}`
                }
                className="c-products__item w-full mb-[theme(spacing.24)] bg-navy_blue p-4 flex flex-col items-start justify-between"
              >
                <div>
                  <h3 className="c-products__item__title text-lg text-ivory font-bold mb-3">
                    {product.productTitle}
                  </h3>
                  <h4 className="c-products__item__subtitle text-sm text-ivory font-light mb-3">
                    {product.productSubTitle}
                  </h4>
                  {product.productContent && (
                    <MyCustomPortableText
                      paragraphClasses="font-serif text-ivory text-xs"
                      ulClasses="mb-[theme(spacing.24)] mt-[theme(spacing.56)]"
                      liClasses="text-ivory ml-3 text-sm font-light"
                      headerClasses="font-bold text-ivory text-lg"
                      value={product.productContent}
                    />
                  )}
                </div>
                <div className="c-products__item__icon">
                  <img
                    className="w-28"
                    src={
                      product.productIcon
                        ? setUrl(product.productIcon).url()
                        : ""
                    }
                    alt={product && product.productTitle}
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};
export default ProductsSection;

ProductsSection.propTypes = {
  titleSection: PropTypes.string,
  anchorSection: PropTypes.string,
  iconSection: PropTypes.object,
};
