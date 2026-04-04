import { 
  FileImage, 
  Minimize2, 
  Ruler, 
  Coins, 
  QrCode, 
  Lock, 
  Type, 
  Pipette, 
  Globe,
  CaseUpper,
  CaseLower,
  CaseSensitive,
  AlignLeft,
  Image as ImageIcon
} from "lucide-react";

export const toolsData = [
  {
    category: "PDF Tools",
    slug: "pdf-tools",
    description: "Every tool you need to work with PDFs in one place.",
    items: [
      { name: "JPG to PDF", icon: ImageIcon, href: "/jpg-to-pdf", description: "Convert JPG images to PDF in seconds." },
      { name: "PDF to JPG", icon: FileImage, href: "/pdf-to-jpg", description: "Extract images from your PDF or convert each page to a JPG." },
    ],
  },
  {
    category: "Image Tools",
    slug: "image-tools",
    description: "Powerful utilities to convert, compress, and edit your images instantly.",
    items: [
      { name: "JPG to PNG Converter", description: "Convert JPG images to PNG format easily.", icon: FileImage, href: "/jpg-to-png" },
      { name: "PNG to JPG Converter", description: "Convert PNG images to JPG format easily.", icon: FileImage, href: "/png-to-jpg" },
      { name: "Image Compressor", description: "Reduce image file size while maintaining quality.", icon: Minimize2, href: "/image-compressor" },
    ]
  },
  {
    category: "Converter Tools",
    slug: "converters",
    description: "Quick and accurate conversion tools for units and currencies.",
    items: [
      { name: "Unit Converter", description: "Convert between different units of measurement.", icon: Ruler, href: "/unit-converter" },
      { name: "Currency Converter", description: "Check real-time exchange rates and convert currencies.", icon: Coins, href: "/currency-converter" },
    ]
  },
  {
    category: "Utilities",
    slug: "utilities",
    description: "Handy web utilities for everyday tasks and productivity.",
    items: [
      { name: "QR Code Generator", description: "Create custom QR codes for links, text, or Wi-Fi.", icon: QrCode, href: "/qr-code-generator" },
      { name: "Password Generator", description: "Generate secure, random passwords for your accounts.", icon: Lock, href: "/password-generator" },
      { name: "Word Counter", description: "Count words, characters, and sentences in your text.", icon: Type, href: "/word-counter" },
      { name: "Color Picker", description: "Select and get codes for any color you need.", icon: Pipette, href: "/color-picker" },
      { name: "BMI Calculator", description: "Calculate your Body Mass Index and check your health category.", icon: Ruler, href: "/bmi-calculator" },
    ]
  },
  {
    category: "Text Tools",
    slug: "text-tools",
    description: "Easy-to-use utilities for formatting and manipulating text.",
    items: [
      { name: "Uppercase Converter", description: "Convert any text to all uppercase letters.", icon: CaseUpper, href: "/uppercase-converter" },
      { name: "Lowercase Converter", description: "Convert any text to all lowercase letters.", icon: CaseLower, href: "/lowercase-converter" },
      { name: "Capitalize Text", description: "Capitalize the first letter of every word in your text.", icon: CaseSensitive, href: "/capitalize-text" },
      { name: "Remove Extra Spaces", description: "Remove redundant spaces and tidy up your text formatting.", icon: AlignLeft, href: "/remove-extra-spaces" },
    ]
  },
  {
    category: "Internet Tools",
    slug: "internet-tools",
    description: "Essential tools to check your internet connection and IP details.",
    items: [
      { name: "What Is My IP", description: "Find out your public IP address and connection details.", icon: Globe, href: "/what-is-my-ip" },
    ]
  }
];
