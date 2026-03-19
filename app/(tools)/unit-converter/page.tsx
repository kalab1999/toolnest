import { Metadata } from "next";
import UnitConverterClient from "./UnitConverterClient";

export const metadata: Metadata = {
  title: "Unit Converter Online Free | Convert Units Easily",
  description: "Convert units online for free. Fast, accurate, and easy-to-use tool for length, weight, volume, and more.",
};

export default function Page() {
  return <UnitConverterClient />;
}
