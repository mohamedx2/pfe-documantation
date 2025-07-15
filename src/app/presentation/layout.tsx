import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baraqex Framework Presentation - The Future of Web Development",
  description: "Interactive presentation showcasing Baraqex Framework features, performance benchmarks, and revolutionary WebAssembly integration for modern full-stack development.",
  keywords: "Baraqex, presentation, web framework, WebAssembly, performance, JavaScript, TypeScript, full-stack",
  openGraph: {
    title: "Baraqex Framework Presentation",
    description: "Interactive presentation showcasing the future of web development with Baraqex Framework",
    type: "website",
  },
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
