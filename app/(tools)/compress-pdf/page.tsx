import { Metadata } from "next";
import CompressPdfClient from "./CompressPdfClient";

export const metadata: Metadata = {
  title: "Compress PDF Online Free | Reduce PDF File Size Instantly",
  description: "Compress PDF online for free. Reduce file size without losing quality. Fast, secure, and easy to use.",
};

export default function Page() {
  return <CompressPdfClient />;
}
