import { Metadata } from "next";
import CapitalizeTextClient from "./CapitalizeTextClient";

export const metadata: Metadata = {
  title: "Capitalize Text Online Free | Convert Text Quickly",
  description: "Capitalize text online for free. Fast, easy, and accurate text capitalization tool for all your needs.",
};

export default function Page() {
  return <CapitalizeTextClient />;
}
