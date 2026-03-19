import { Metadata } from "next";
import PngToJpgClient from "./PngToJpgClient";

export const metadata: Metadata = {
  title: "PNG to JPG Converter Online Free | Convert Images Quickly",
  description: "Convert PNG images to JPG online for free. Fast, high-quality, and secure image conversion tool.",
};

export default function Page() {
  return <PngToJpgClient />;
}
