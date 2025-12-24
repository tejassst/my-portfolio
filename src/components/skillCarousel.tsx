'use client';

import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  SiCplusplus,
  SiPython,
  SiFastapi,
  SiDjango,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiExpo,
  SiPostgresql,
  SiMongodb,
} from 'react-icons/si';

const skills = [
  { name: 'C++', icon: SiCplusplus },
  { name: 'Python', icon: SiPython },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'Django', icon: SiDjango },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'HTML/CSS', icon: SiHtml5 },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Expo', icon: SiExpo },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: SiMongodb },
];

export default function SkillCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let start = 0;
    const speed = 0.4;

    function animate() {
      if (!track) return;
      if (!pausedRef.current) {
        start -= speed;

        if (Math.abs(start) >= track.scrollWidth / 2) {
          start = 0;
        }
        track.style.transform = `translateX(${start}px)`;
      }
      requestAnimationFrame(animate);
    }

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className="relative overflow-hidden py-12"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div ref={trackRef} className="flex w-max gap-6 will-change-transform">
        {[...skills, ...skills].map((skill, i) => {
          const Icon = skill.icon;
          return (
            <span
              key={i}
              className="whitespace-nowrap rounded-md border border-[#bfa76f]/20 
                         bg-[#161a22] px-6 py-3 text-sm tracking-wide 
                         text-[#e5e7eb] backdrop-blur-sm flex items-center gap-3"
            >
              <Icon className="text-xl text-[#bfa76f]" />
              {skill.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
