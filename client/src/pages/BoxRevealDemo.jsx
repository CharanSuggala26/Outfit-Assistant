import React from "react";
import { Button } from "../components/ui/button";
import { BoxReveal } from "../components/ui/box-reveal";
import { Link } from "react-router-dom";

const BoxRevealDemo=()=> {
  const accentColor = "#5046e6";

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 md:px-8 pt-8 overflow-hidden mb-12">
      <BoxReveal boxColor={accentColor} duration={0.5} delay={0}>
        <p className="text-4xl sm:text-5xl md:text-6xl font-semibold">
          OUTFIT ASSISTANT <span className="text-[#5046e6]">.</span>
        </p>
      </BoxReveal>
      
      <BoxReveal boxColor={accentColor} duration={0.5} delay={0.1}>
        <h2 className="mt-2 text-base sm:text-lg">
          AI-powered outfit suggestions for{" "}
          <span className="text-[#5046e6]">vacation</span>
        </h2>
      </BoxReveal>
      
      <BoxReveal boxColor={accentColor} duration={0.5} delay={0.2}>
        <div className="mt-6">
          <p className="text-sm sm:text-base">
            -&gt; Generates Outfits based on your
            <span className="font-semibold text-[#5046e6]"> Vacation</span>,
            <span className="font-semibold text-[#5046e6]"> Climate</span>,
            <span className="font-semibold text-[#5046e6]"> Purpose</span>,
            and
            <span className="font-semibold text-[#5046e6]"> Gender</span>
            . <br />
            -&gt; Try them on virtually and pack with confidence <br />
          </p>
        </div>
      </BoxReveal>
      
      <BoxReveal boxColor={accentColor} duration={0.5} delay={0.3}>
        <div className="mt-6">
          <Link to="/vacation" className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Button className="bg-[#5046e6] hover:bg-[#4038c2]">
            Explore
          </Button>
          </Link>
        </div>
      </BoxReveal>
    </div>
  );
}

export default BoxRevealDemo;