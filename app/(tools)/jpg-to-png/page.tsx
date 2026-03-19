import { Metadata } from "next";
import JpgToPngClient from "./JpgToPngClient";

export const metadata: Metadata = {
  title: "JPG to PNG Converter Online Free | Convert Images Easily",
  description: "Convert JPG images to PNG format online for free. Quick, secure, and high-quality image conversion.",
};

export default function Page() {
  return <JpgToPngClient />;
}
