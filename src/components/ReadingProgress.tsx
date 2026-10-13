import { createPortal } from "react-dom";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin bar pinned to the top of the viewport that fills as the reader scrolls
 * through an article. Spring smoothing keeps it from jumping on fast scrolls.
 * Portaled to <body>: an ancestor with a CSS transform (the page transition)
 * would otherwise become the containing block and move the "fixed" bar off-screen.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return createPortal(
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-emerald-green pointer-events-none"
      style={{ scaleX }}
    />,
    document.body
  );
}
