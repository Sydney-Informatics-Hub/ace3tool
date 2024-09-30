"use client";
import { Alert, Button, CustomFlowbiteTheme, Modal } from "flowbite-react";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import Image from "next/image";
import frontier_logo from "@/app/_images/frontier_logo_small.png";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const customTheme: CustomFlowbiteTheme["modal"] = {
  header: {
    base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
    title: "w-full flex justify-between text-xl font-medium text-indigo-600",
    close: {
      base: "hidden",
      icon: "hidden",
    },
  },
};

export default function TermsModal() {
  const [cookies, setCookie, removeCookie] = useCookies(["accepted_terms"]);
  const accepted = cookies.accepted_terms === true;
  const [open, setOpen] = React.useState(false);
  const [declined, setDeclined] = React.useState(false);

  useEffect(() => {
    setOpen(!accepted);
  }, [accepted]);

  const accept_terms = () => {
    const one_year = new Date();
    one_year.setFullYear(one_year.getFullYear() + 1);
    setCookie("accepted_terms", "true", { expires: one_year });
    setOpen(false);
  };
  const decline_terms = () => {
    setDeclined(true);
  };

  return (
    <Modal
      size="4xl"
      show={open}
      dismissible={false}
      theme={customTheme}
      onClose={() => null}
    >
      <Modal.Header>
        <span className="inline">Terms and Conditions of Use</span>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col md:flex-row gap-2">
          <p className="grow inline">
            This tool is designed exclusively for use by qualified health
            professionals. The ACE-III online dementia screening tool is not
            intended for self-evaluation and must not be self-administered under
            any circumstances.
          </p>
          <Image
            className="inline"
            // NOTE: need to manually prefix this with the base path
            src={frontier_logo}
            alt="FRONTIER Logo"
            width={200}
            height={135}
            priority
          />
        </div>
        {declined && (
          <Alert className="mt-2" color="failure" icon={InformationCircleIcon}>
            Thank you for your response. This tool is intended for use by
            qualified health professionals only. If you are seeking further
            information or resources on dementia, please visit{" "}
            <a
              className="text-red-900 underline"
              href="https://frontierftd.org/"
            >
              our website
            </a>
            .
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button color="success" onClick={() => accept_terms()}>
          Accept
        </Button>
        <Button color="gray" onClick={decline_terms}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
