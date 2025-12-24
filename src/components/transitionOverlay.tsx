'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function TransitionOverlay({ active }: { active: boolean }) {
  useEffect(() => {
    if (active) {
      // Apply zoom and blur effect to the entire page except header
      document.body.style.overflow = 'hidden';
      const mainContent = document.querySelector('main');
      const header = document.querySelector('header');

      if (mainContent) {
        mainContent.style.transform = 'scale(1.3)';
        mainContent.style.filter = 'blur(8px)';
        mainContent.style.transition =
          'transform 0.5s ease-out, filter 0.5s ease-out';
      }

      // Keep header fixed and unaffected
      if (header) {
        header.style.transform = 'scale(1)';
        header.style.filter = 'none';
        header.style.position = 'fixed';
        header.style.zIndex = '100';
      }
    } else {
      document.body.style.overflow = '';
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.style.transform = 'scale(1)';
        mainContent.style.filter = 'blur(0px)';
      }
    }
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md"
        />
      )}
    </AnimatePresence>
  );
}
