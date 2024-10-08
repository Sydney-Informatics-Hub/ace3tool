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
import { useRouter } from "next/navigation";

const NavbarTheme: FlowbiteNavbarTheme = {
  root: {
    base: "bg-indigo-600 text-white px-2 py-2.5 sm:px-4 font-heading",
    rounded: {
      on: "rounded",
      off: "",
    },
    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "mx-auto flex flex-wrap items-center justify-around",
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
    base: "block py-2 pl-3 pr-4 md:p-0 text-base",
    active: {
      on: "bg-indigo-700 text-white font-bold md:bg-transparent md:hover:text-amber-300 md:underline md:underline-offset-8 md:decoration-4 md:decoration-orange-400",
      off: "border-b border-gray-100 font-medium text-indigo-100 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-amber-300",
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

const navbar_items = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Explore our data", href: "/explore/" },
];

export default function MainNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const scroll_to_form = () => {
    if (pathname !== "/") {
      router.push("/");
    }

    const score_form = document.querySelector("#score-entry");
    score_form?.scrollTo({ top: 0, behavior: "smooth" });
    if (score_form !== null) {
      const current_class = score_form.className;
      score_form.className += " border-orange-400 border-4";
      setTimeout(() => {
        score_form.className = current_class;
      }, 1000);
    }
  };
  return (
    <Navbar theme={NavbarTheme} fluid>
      <NavbarBrand as={Link} href="/">
        <ChartBarIcon className="size-6 me-2" />
        <span className="self-center text-base text-wrap md:text-lg md:whitespace-nowrap">
          ACE-III online dementia screening tool
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button
          gradientDuoTone="purpleToPink"
          className="hidden md:inline me-2 text-nowrap"
          onClick={scroll_to_form}
        >
          Try it!
        </Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {navbar_items.map((item, index) => {
          return (
            <NavbarLink
              key={index}
              as={Link}
              href={item.href}
              active={pathname === item.href}
            >
              {item.label}
            </NavbarLink>
          );
        })}
      </NavbarCollapse>
    </Navbar>
  );
}
