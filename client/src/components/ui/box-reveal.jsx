import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

export const BoxReveal = ({
  children,
  boxColor = "#5046e6",
  duration = 0.5,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="relative block w-fit">
      <motion.div
        initial={{ height: "100%" }}
        animate={isInView ? { height: 0 } : { height: "100%" }}
        transition={{
          duration: duration,
          delay: delay,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: boxColor,
          zIndex: 20,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};