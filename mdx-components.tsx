import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="text-lg text-indigo-600 font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-4 text-base text-indigo-600 font-semibold">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="my-1 break-normal">{children}</p>,
    a: (props) => {
      const { children, ...other_props } = props;
      return (
        <a className="text-indigo-600 hover:text-indigo-800" {...other_props}>
          {children}
        </a>
      );
    },
    ...components,
  };
}
