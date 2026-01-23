"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const DustParticles = dynamic(() => import("@/components/DustParticles"), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <DustParticles />
      <SmoothScroll>
        {children}
        <Footer />
      </SmoothScroll>
    </>
  );
}
