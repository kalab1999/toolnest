import { Metadata } from "next";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

export const metadata: Metadata = {
  title: "Password Generator Online Free | Create Strong Passwords",
  description: "Generate secure passwords online for free. Fast, strong, and easy-to-use password generator for all your accounts.",
};

export default function Page() {
  return <PasswordGeneratorClient />;
}
