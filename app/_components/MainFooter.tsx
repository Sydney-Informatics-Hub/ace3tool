import { CustomFlowbiteTheme, Footer, FooterProps } from "flowbite-react";

export interface MainFooterProps extends FooterProps {}

export default function MainFooter(props: MainFooterProps) {
  return (
    <Footer {...props}>
      <div className="md:flex md:justify-between w-full max-w-4xl mx-auto">
        <Footer.Copyright
          href="https://www.sydney.edu.au/research/facilities/sydney-informatics-hub.html"
          by="Sydney Informatics Hub"
          year={2024}
        />
        <Footer.LinkGroup>
          <Footer.Link href="https://github.com/Sydney-Informatics-Hub/">
            GitHub
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
    </Footer>
  );
}
