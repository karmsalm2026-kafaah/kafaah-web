import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Kafaah Industrial Solutions",
  robots: { index: false, follow: false },
};

export default function GatewayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
