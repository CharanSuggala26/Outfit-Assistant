import React from "react";
import { StickyScroll } from "../components/ui/StickyScroll";

const content = [
  {
    title: "Enter Location",
    description:
     "Start by entering your location to personalize outfit recommendations based on weather, trends, and local fashion preferences.",
    content: (
        <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20240131140559/IMG_20240131_135601-ezgifcom-png-to-webp-converter.webp"
          className="h-full w-full object-cover"
          alt="Enter Location"
        />
      </div>
    ),
  },
  {
    title: "Choose Date and Upload Image",
    description:
    "Select the date for which you need the outfit, whether it's for a special event or casual wear. Then, upload your image to ensure the AI provides personalized styling suggestions.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg"
          className="h-full w-full object-cover"
          alt="Choose Date and Upload Image demo"
        />
      </div>
    ),
  },
  {
    title: "Choose from the Generated Outfits",
    description:
      "Browse through AI-curated outfit options tailored to your style, body type, and occasion. Select the one that best suits your preference.",
    content: (
        <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="https://live.staticflickr.com/65535/52229244865_99970a53bc_k.jpg"
          className="h-full w-full object-cover"
          alt="Select from the Generated Outfits demo"
        />
      </div>
    ),
  },
  {
    title: "Virtual Try-On",
    description:
      "Experience a real-time preview of how the selected outfit looks on you using advanced AI-based Virtual Try-On technology before making a final decision.",
    content: (
        <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="https://savvycomsoftware.com/wp-content/uploads/2024/08/original-25ef619e86b78ee9b23ba193bf3019ff.png"
          className="h-full w-full object-cover"
          alt="Virtual Try-ON demo"
        />
      </div>
    ),
  },
];

export default function StickyScrollDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}