import { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter Online Free | Count Words & Characters",
  description: "Count words, characters, and lines online for free. Fast, accurate, and easy-to-use word counter tool.",
};

export default function Page() {
  return <WordCounterClient />;
}
