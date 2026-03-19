import { Metadata } from "next";
import LowercaseConverterClient from "./LowercaseConverterClient";

export const metadata: Metadata = {
  title: "Lowercase Text Converter Online Free | Convert Text Easily",
  description: "Convert text to lowercase online for free. Fast, easy, and accurate text conversion tool.",
};

export default function Page() {
  return <LowercaseConverterClient />;
}
