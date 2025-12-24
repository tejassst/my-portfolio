'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TransitionOverlay from './transitionOverlay';
import { useTransitionSound } from '@/hooks/useTransitionSound';
import { motion } from 'framer-motion';

export default function ProjectCard({ id }: { id: string }) {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);
  const playTransitionSound = useTransitionSound();

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
      playTransitionSound();
      setTransitioning(true);

      setTimeout(() => {
        router.push(`/projects/${id}`);
      }, 400);
    } else {
      router.push(`/projects/${id}`);
    }
  };

  return (
    <>
      <TransitionOverlay active={transitioning} />

      <div
        onClick={handleClick}
        className="relative z-50 cursor-pointer bg-[#161a22] rounded-2xl p-8 border border-[#bfa76f]/30 shadow-lg hover:border-[#bfa76f]/50 transition-colors duration-300"
      >
        {/* Project Content */}
        <h1 className="text-[#e5e7eb] text-2xl font-bold mb-4">Project {id}</h1>
        <p className="text-[#e5e7eb]/80">Click to view project details</p>
      </div>
    </>
  );
}
