import { Metadata } from "next";
import CurrencyConverterClient from "./CurrencyConverterClient";

export const metadata: Metadata = {
  title: "Currency Converter Online Free | Convert Currencies Instantly",
  description: "Convert currencies online for free. Get fast, accurate, and up-to-date exchange rates worldwide.",
};

export default function Page() {
  return <CurrencyConverterClient />;
}
