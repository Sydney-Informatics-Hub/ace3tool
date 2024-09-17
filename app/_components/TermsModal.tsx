"use client";
import { Button, CustomFlowbiteTheme, Modal } from "flowbite-react";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import Image from "next/image";

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

  useEffect(() => {
    setOpen(!accepted);
  }, [accepted]);

  const accept_terms = () => {
    setCookie("accepted_terms", "true");
    setOpen(false);
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
            This tool is designed exclusively for use by health professionals.
            The ACE-III online dementia screening tool is not intended for
            self-evaluation and must not be self-administered under any
            circumstances.
          </p>
          <Image
            className="inline"
            // NOTE: need to manually prefix this with the base path
            src="/img/frontier_logo.png"
            alt="FRONTIER Logo"
            width={200}
            height={150}
            priority
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="success" onClick={() => accept_terms()}>
          Accept
        </Button>
        <Button color="gray">Decline</Button>
      </Modal.Footer>
    </Modal>
  );
}
