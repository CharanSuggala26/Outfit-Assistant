import React, { forwardRef, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import {Link} from 'react-router-dom'

const cn = (...classes) => classes.filter(Boolean).join(" ");

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  endYOffset = 0,
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  React.useEffect(() => {
    const animate = () => {
      const length = pathRef.current?.getTotalLength();
      if (length) {
        progress.set((Date.now() % 2000) / 2000 * length);
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, [progress]);

  const path = () => {
    const from = fromRef.current?.getBoundingClientRect();
    const to = toRef.current?.getBoundingClientRect();
    const container = containerRef.current?.getBoundingClientRect();
    if (!from || !to || !container) return "M0,0 Q0,0 0,0";

    const startX = from.left + from.width / 2 - container.left;
    const startY = from.top + from.height / 2 - container.top;
    const endX = to.left + to.width / 2 - container.left;
    const endY = to.top + to.height / 2 - container.top + endYOffset;
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 + curvature;

    return reverse
      ? `M${endX},${endY} Q${midX},${midY} ${startX},${startY}`
      : `M${startX},${startY} Q${midX},${midY} ${endX},${endY}`;
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <motion.path
        ref={pathRef}
        d={path()}
        stroke="#0ea5e9"
        strokeWidth="2"
        fill="none"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    </svg>
  );
};

// Formatted Circle component
const Circle = forwardRef(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
      className
    )}
  >
    {children}
  </div>
));
Circle.displayName = "Circle";

// AnimatedBeamDemo with 4 lines to AI Core
const AnimatedBeamDemo = () => {
  const containerRef = useRef(null);
  const aiCoreRef = useRef(null); // AI Core (center)
  const locationRef = useRef(null); // Location (top)
  const userImageRef = useRef(null); // User Image (right)
  const outfitRef = useRef(null); // Outfit Selection (bottom)
  const tryOnRef = useRef(null); // Virtual Try-On (left)

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="relative flex h-full w-full max-w-lg items-center justify-center">
        {/* AI Core (Center) */}
        <Circle
          ref={aiCoreRef}
          className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2"
        >
          🤖
        </Circle>

        {/* Location (Top) */}
        <Circle
          ref={locationRef}
          className="absolute left-1/2 top-0 -translate-x-1/2"
        >
          🌍
        </Circle>

        {/* User Image (Right) */}
        <Circle
          ref={userImageRef}
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          📸
        </Circle>

        {/* Outfit Selection (Bottom) */}
        <Circle
          ref={outfitRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          👕
        </Circle>

        {/* Virtual Try-On (Left) */}
        <Circle
          ref={tryOnRef}
          className="absolute left-0 top-1/2 -translate-y-1/2"
        >
          👗
        </Circle>
      </div>

      {/* Animated Beams connecting to AI Core */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={locationRef}
        toRef={aiCoreRef}
        curvature={-50}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userImageRef}
        toRef={aiCoreRef}
        curvature={50}
        endYOffset={0}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={outfitRef}
        toRef={aiCoreRef}
        curvature={50}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tryOnRef}
        toRef={aiCoreRef}
        curvature={-50}
        endYOffset={0}
        reverse
      />
    </div>
  );
};

// Main About component
const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-12 text-center"
        >
          <h1 className="mb-6 text-teal-400 text-4xl font-bold md:text-5xl">
            Welcome to AI Vacation Outfit Assistant
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-300 md:text-xl">
            Your go-to companion for effortless style, blending cutting-edge AI
            with your unique flair.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <img
            src="https://static.fibre2fashion.com//articleresources/images/23/2287/SS988ebe_Small.jpg"
            alt="Fashion Inspiration"
            className="mx-auto w-full max-w-2xl rounded-lg shadow-xl"
          />
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-semibold text-teal-400 md:text-4xl">
            Our Mission
          </h2>
          <p className="mx-auto max-w-4xl text-lg text-gray-300">
            At AI Vacation Outfit Assistant, we believe dressing well should be
            simple, fun, and tailored to you. Our mission is to empower everyone
            to look their best—whether for a vacation, a big event, or just
            another day—by harnessing smart technology to craft personalized
            outfit ideas that inspire confidence and creativity.
          </p>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-semibold text-teal-400 md:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mx-auto mb-8 max-w-4xl text-lg text-gray-300">
            We combine AI precision with a passion for fashion to deliver outfit
            inspiration that’s as unique as you are. From understanding your
            environment to offering a virtual preview of your look, we’re here
            to make style effortless and exciting—no matter where life takes
            you.
          </p>
          <Link to="/vacation">
          <button
            className="inline-block rounded-md bg-teal-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-teal-600"
          >
            Get Started
          </button>
          </Link>

        </motion.div>

        {/* Animated Beam Demo Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="mb-6 text-3xl font-semibold text-teal-400 md:text-4xl">
            How It Works
          </h2>
          <AnimatedBeamDemo />
          <p className="mx-auto mt-4 max-w-4xl text-lg text-gray-300">
            Our AI connects your world—location, preferences, and style—to create
            a seamless fashion experience.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;