import { Metadata } from "next";
import WhatIsMyIpClient from "./WhatIsMyIpClient";

export const metadata: Metadata = {
  title: "What Is My IP Address Online | Check IP Instantly",
  description: "Check your IP address online for free. Fast, accurate, and easy-to-use IP checker tool.",
};

export default function Page() {
  return <WhatIsMyIpClient />;
}
