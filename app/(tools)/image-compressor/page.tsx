import { Metadata } from "next";
import ImageCompressorClient from "./ImageCompressorClient";

export const metadata: Metadata = {
  title: "Image Compressor Online Free | Reduce Image Size Instantly",
  description: "Compress images online for free without losing quality. Fast, secure, and easy image compression tool.",
};

export default function Page() {
  return <ImageCompressorClient />;
}
