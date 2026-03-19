import { Metadata } from "next";
import QrCodeGeneratorClient from "./QrCodeGeneratorClient";

export const metadata: Metadata = {
  title: "QR Code Generator Online Free | Create QR Codes Easily",
  description: "Generate QR codes online for free. Fast, secure, and easy-to-use QR code creator for any data.",
};

export default function Page() {
  return <QrCodeGeneratorClient />;
}
