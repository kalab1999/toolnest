import { Metadata } from "next";
import BmiCalculatorClient from "./BmiCalculatorClient";

export const metadata: Metadata = {
  title: "BMI Calculator Online Free | Check Your Body Mass Index",
  description: "Use our free BMI calculator to check your body mass index instantly. Fast, accurate, and easy to use for everyone.",
};

export default function Page() {
  return <BmiCalculatorClient />;
}
