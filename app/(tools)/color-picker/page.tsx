import { Metadata } from "next";
import ColorPickerClient from "./ColorPickerClient";

export const metadata: Metadata = {
  title: "Color Picker Online Free | Pick Colors Easily",
  description: "Pick colors online for free. Get hex, RGB, HSL values instantly. Fast and easy color selection tool.",
};

export default function Page() {
  return <ColorPickerClient />;
}
