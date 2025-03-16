import React from "react";
import { StickyScroll } from "../components/ui/StickyScroll";

const content = [
  {
    title: "Enter Location",
    description:
     "Begin by entering your location to get outfit recommendations tailored to your region. The AI considers factors like weather, local fashion trends, and cultural preferences to suggest the most suitable outfits for your needs.",
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
    "Select the date for which you need the outfit—whether it's for a casual day, office meeting, party, or a special occasion. Upload a clear image of yourself so the AI can generate personalized outfit suggestions that match your style, body type, and preferences.",
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
      "Explore a variety of AI-curated outfit options designed to fit your selected occasion and personal style. Each outfit is carefully selected based on color combinations, fabric choices, and fashion trends. Pick the one that resonates with your style and comfort.",
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
      "See how the chosen outfit looks on you before making a decision! Using advanced AI-powered Virtual Try-On technology, the system overlays the selected outfit onto your uploaded image, providing a realistic preview. Make adjustments, try different styles, and finalize your perfect look with confidence.",
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