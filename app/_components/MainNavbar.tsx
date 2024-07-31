"use client";
import Link from "next/link";
import {
  Button,
  FlowbiteNavbarTheme,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { ChartBarIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

const NavbarTheme: FlowbiteNavbarTheme = {
  root: {
    base: "bg-indigo-600 text-gray-200 px-2 py-2.5 sm:px-4",
    rounded: {
      on: "rounded",
      off: "",
    },
    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "mx-auto flex flex-wrap items-center justify-between",
      fluid: {
        on: "",
        off: "container",
      },
    },
  },
  brand: {
    base: "flex items-center",
  },
  collapse: {
    base: "w-full md:block md:w-auto",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-2 pl-3 pr-4 md:p-0",
    active: {
      on: "bg-indigo-500 text-white md:bg-transparent md:text-gray-100 md:hover:text-amber-400",
      off: "border-b border-gray-100 text-gray-200 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-amber-400",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-100 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden",
    icon: "h-6 w-6 shrink-0",
  },
};

export default function MainNavbar() {
  const pathname = usePathname();
  return (
    <Navbar fluid theme={NavbarTheme}>
      <NavbarBrand as={Link} href="#">
        <ChartBarIcon className="size-6 me-2" />
        <span className="self-center whitespace-nowrap text-lg font-semibold">
          ACE-III risk calculator
        </span>
      </NavbarBrand>
      <div className="flex flex-grow-0 md:order-2">
        <Link href="/#score-entry" passHref legacyBehavior>
          <Button gradientDuoTone="purpleToPink" className="me-2">
            Try it!
          </Button>
        </Link>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active={pathname === "/"}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} active={pathname === "/about"} href="/about">
          About
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
