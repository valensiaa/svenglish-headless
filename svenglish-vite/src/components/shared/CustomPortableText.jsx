import { PortableText } from "@portabletext/react";

export function MyCustomPortableText({
  paragraphClasses,
  headerClasses,
  ulClasses,
  liClasses,
  linkClasses,
  value,
}) {
  const components = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
    },
    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => <ul className={ulClasses}>{children}</ul>,
      number: ({ children }) => <ol className="mt-lg">{children}</ol>,
    },
    listItem: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <li style={{ listStyleType: "disc" }} className={liClasses}>
          {children}
        </li>
      ),
    },
    marks: {
      // Ex. 1: custom renderer for the em / italics decorator
      em: ({ children }) => (
        <em className="text-gray-600 font-semibold">{children}</em>
      ),

      // Ex. 2: rendering a custom `link` annotation
      link: ({ value, children }) => {
        const target = (value?.href || "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === "_blank" && "noindex nofollow"}
          >
            {children}
          </a>
        );
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
