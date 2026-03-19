import { Metadata } from "next";
import JpgToPdfClient from "./JpgToPdfClient";

export const metadata: Metadata = {
  title: "JPG to PDF Converter Online Free | Convert Images to PDF",
  description: "Convert JPG images to PDF online for free. Quick, easy, and secure image-to-PDF converter.",
};

export default function Page() {
  return <JpgToPdfClient />;
}
