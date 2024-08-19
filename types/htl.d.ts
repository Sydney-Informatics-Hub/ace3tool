declare module "htl" {
  export declare const html: {
    <T extends HTMLElement | Text>(
      ...args: (TemplateStringsArray | number | string)[]
    ): T;
  };
  export declare const svg: {
    <T extends SVGElement>(
      ...args: (
        | TemplateStringsArray
        | number
        | string
        | DocumentFragment
        | DocumentFragment[]
      )[]
    ): T;
    fragment(
      ...args: (TemplateStringsArray | number | string)[]
    ): DocumentFragment;
  };
}
