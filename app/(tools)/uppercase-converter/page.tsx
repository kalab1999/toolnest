import { Metadata } from "next";
import UppercaseConverterClient from "./UppercaseConverterClient";

export const metadata: Metadata = {
  title: "Uppercase Text Converter Online Free | Capitalize Text Instantly",
  description: "Convert text to uppercase online for free. Fast, easy, and accurate text conversion tool.",
};

export default function Page() {
  return <UppercaseConverterClient />;
}
