'use client';

import { motion } from 'framer-motion';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.03, opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="origin-center"
    >
      {children}
    </motion.div>
  );
}
