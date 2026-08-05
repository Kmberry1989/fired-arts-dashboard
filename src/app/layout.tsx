import type { Metadata } from "next";
import "../app/globals.css";
export const metadata: Metadata = {
title: "Fired Arts Creative Dashboard",
description: "Brand asset management engine",
};
export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (

{children}

);
}
