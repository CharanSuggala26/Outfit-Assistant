import React, { forwardRef, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Simplified cn utility (className concatenation)
const cn = (...classes) => classes.filter(Boolean).join(" ");

// AnimatedBeam component with persistent beams
const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  endYOffset = 0,
}) => {
  const pathRef = useRef(null);
  const [pathD, setPathD] = useState("M0,0 Q0,0 0,0");

  const updatePath = () => {
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

  useEffect(() => {
    const handleUpdate = () => setPathD(updatePath());
    handleUpdate(); // Initial update
    window.addEventListener("resize", handleUpdate);
    return () => window.removeEventListener("resize", handleUpdate);
  }, [containerRef, fromRef, toRef, curvature, reverse, endYOffset]);

  return (
    <svg className="absolute inset-0 h-full w-full pointer-events-none">
      <motion.path
        ref={pathRef}
        d={pathD}
        stroke="#0ea5e9"
        strokeWidth="2"
        fill="none"
        initial={{ strokeDasharray: "20 20", strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -40 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    </svg>
  );
};

// Circle component
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

// AnimatedBeamDemo for Contact methods
const ContactBeamDemo = () => {
  const containerRef = useRef(null);
  const contactHubRef = useRef(null); // Central Contact Hub
  const emailRef = useRef(null); // Email (top)
  const phoneRef = useRef(null); // Phone (right)
  const socialRef = useRef(null); // Social Media (bottom)
  const supportRef = useRef(null); // Support (left)

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="relative flex h-full w-full max-w-lg items-center justify-center">
        {/* Central Contact Hub */}
        <Circle
          ref={contactHubRef}
          className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2"
        >
          📬
        </Circle>

        {/* Email (Top) */}
        <Circle
          ref={emailRef}
          className="absolute left-1/2 top-0 -translate-x-1/2"
        >
          ✉️
        </Circle>

        {/* Phone (Right) */}
        <Circle
          ref={phoneRef}
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          📞
        </Circle>

        {/* Social Media (Bottom) */}
        <Circle
          ref={socialRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          🌐
        </Circle>

        {/* Support (Left) */}
        <Circle
          ref={supportRef}
          className="absolute left-0 top-1/2 -translate-y-1/2"
        >
          🆘
        </Circle>
      </div>

      {/* Animated Beams connecting to Contact Hub */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={emailRef}
        toRef={contactHubRef}
        curvature={-50}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={phoneRef}
        toRef={contactHubRef}
        curvature={50}
        endYOffset={0}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={socialRef}
        toRef={contactHubRef}
        curvature={50}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={supportRef}
        toRef={contactHubRef}
        curvature={-50}
        endYOffset={0}
        reverse
      />
    </div>
  );
};

// Main Contact component
const Contact = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.2 } },
  };

  const scaleHover = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
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
          <h1 className="mb-6 text-4xl font-bold text-teal-400 md:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-300 md:text-xl">
            We’re here to help you with any questions, feedback, or style advice.
            Reach out and let’s connect!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16 mx-auto max-w-lg"
        >
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white focus:border-teal-500 focus:ring-teal-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white focus:border-teal-500 focus:ring-teal-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white focus:border-teal-500 focus:ring-teal-500"
                placeholder="Your Message"
              />
            </div>
            <motion.button
              type="submit"
              whileHover="hover"
              variants={scaleHover}
              className="w-full rounded-md bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Methods Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="mb-6 text-3xl font-semibold text-teal-400 md:text-4xl">
            Reach Us Any Way You Like
          </h2>
          <ContactBeamDemo />
          <p className="mx-auto mt-4 max-w-4xl text-lg text-gray-300">
            Whether it’s a quick email, a phone call, or a social media shoutout,
            we’re just a click away.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block rounded-md bg-teal-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-teal-600"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;