import { Metadata } from "next";
import PdfToJpgClient from "./PdfToJpgClient";

export const metadata: Metadata = {
  title: "PDF to JPG Converter Online Free | Extract Images from PDF",
  description: "Convert PDF files to JPG images online for free. Fast, secure, and easy-to-use PDF to JPG tool.",
};

export default function Page() {
  return <PdfToJpgClient />;
}
