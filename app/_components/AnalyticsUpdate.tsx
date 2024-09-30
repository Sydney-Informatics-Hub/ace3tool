"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    goatcounter: {
      count: (params: { path: string }) => void;
    };
  }
}

/**
 * Component to call goatcounter's count function when
 * the pathname changes
 */
export default function AnalyticsUpdate() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.goatcounter?.count({
        path: pathname,
      });
    }
  }, [pathname, window?.goatcounter]);

  return null;
}
