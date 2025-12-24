'use client';

import Image from 'next/image';
import Link from 'next/link';
import useScrollAnimation from '@/components/scrollEffect';
import SkillCarousel from '@/components/skillCarousel';
export default function Home() {
  const sectionRef1 = useScrollAnimation();
  const sectionRef2 = useScrollAnimation();
  const sectionRef3 = useScrollAnimation();
  const sectionRef4 = useScrollAnimation();

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0f1115] bg-contain bg-center bg-no-repeat">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#161a22]/80 backdrop-blur-md border-b border-[#bfa76f]/20 shadow-lg">
        <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-center">
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="transition-transform duration-300"
            >
              <Image
                src="/logo.png"
                alt="Home"
                width={40}
                height={40}
                className="hover:scale-110 transition-transform duration-300"
              />
            </button>{' '}
            <button
              onClick={() => scrollToSection('about')}
              className="relative text-[#e5e7eb] text-lg font-medium hover:text-[#bfa76f] transition-colors duration-300 group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#bfa76f] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="relative text-[#e5e7eb] text-lg font-medium hover:text-[#bfa76f] transition-colors duration-300 group"
            >
              Skills
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#bfa76f] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="relative text-[#e5e7eb] text-lg font-medium hover:text-[#bfa76f] transition-colors duration-300 group"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#bfa76f] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="relative text-[#e5e7eb] text-lg font-medium hover:text-[#bfa76f] transition-colors duration-300 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#bfa76f] group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Profile Section */}

      <div
        id="home"
        className="mt-25 text-6xl flex flex-row font-bold text-[#e5e7eb] hover:text-[#bfa76f] transition-colors duration-300"
      >
        <h1 className="ml-5">Full-Stack Developer</h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-10 mb-10">
        {/* Name */}
        <h1 className="text-6xl mb-30 font-bold text-[#e5e7eb] hover:text-[#bfa76f] transition-colors duration-300">
          Tejas Tyagi
        </h1>
      </div>

      {/* Section Border */}
      <div className="flex justify-center my-16">
        <Image
          src="/section_border.png"
          alt="Section Border"
          width={800}
          height={20}
          className="opacity-50"
        />
      </div>

      {/* About Section */}
      <section
        id="about"
        ref={sectionRef2}
        className="opacity-0 translate-y-2 transition-all duration-700 ease-out mx-auto max-w-4xl text-center text-lg leading-relaxed mb-32 bg-[#161a22] rounded-2xl p-10 border border-[#bfa76f]/30"
      >
        <Image
          src="/Me.jpeg"
          alt="Tejas Tyagi"
          width={250}
          height={250}
          className="rounded-full border-4 border-[#bfa76f] mx-auto mb-6"
        />
        <p className="text-[#e5e7eb] hover:text-[#bfa76f] transition-colors duration-300">
          Hi, I’m Tejas Tyagi, a Computer Science student at the University of
          Maryland, Baltimore County, with a minor in Entrepreneurship. I
          specialize in full-stack development and artificial intelligence, with
          a deep passion for building software that creates meaningful,
          real-world impact. My technical toolkit includes JavaScript (React.js,
          Node.js, Express.js) for dynamic front-end and back-end development,
          Python for AI/ML and automation, and C++ for algorithmic and systems
          programming. I also work with tools like FastAPI, Supabase, and
          Tailwind CSS to build scalable, efficient, and user-centered
          applications. I love exploring the intersection of design and
          functionality; transforming ideas into intuitive, performant products
          that solve real problems.
        </p>
      </section>

      {/* Section Border */}
      <div className="flex justify-center my-16">
        <Image
          src="/section_border.png"
          alt="Section Border"
          width={800}
          height={20}
          className="opacity-50"
        />
      </div>
      {/* Skills Section */}
      <section
        id="skills"
        ref={sectionRef3}
        className="opacity-0 translate-y-2 transition-all duration-700 ease-out mx-auto max-w-4xl text-center mb-32"
      >
        <h2 className="text-4xl font-bold text-[#e5e7eb] mb-8">Skills</h2>
        <SkillCarousel />
      </section>

      {/* Section Border */}
      <div className="flex justify-center my-16">
        <Image
          src="/section_border.png"
          alt="Section Border"
          width={800}
          height={20}
          className="opacity-50"
        />
      </div>

      <section
        id="projects"
        ref={sectionRef4}
        className="opacity-0 translate-y-2 transition-all duration-700 ease-out mx-auto max-w-4xl text-center mb-32"
      >
        <h1 className="text-4xl font-bold text-[#e5e7eb] mb-8">Projects</h1>
      </section>

      {/* Section Border */}
      <div className="flex justify-center my-16">
        <Image
          src="/section_border.png"
          alt="Section Border"
          width={800}
          height={20}
          className="opacity-50"
        />
      </div>

      <section
        ref={sectionRef1}
        className="opacity-0 translate-y-2 transition-all duration-700 ease-out mx-auto max-w-2xl text-center text-lg leading-relaxed mb-32"
      >
        <div
          id="contact"
          className="mb-60 font-bold text-[#e5e7eb] hover:text-[#bfa76f] transition-colors duration-300 bg-[#161a22] backdrop-blur-sm rounded-2xl p-10 border border-[#bfa76f]/30 flex items-center justify-center gap-10"
        >
          <p>Let's chat</p>
          <Link
            href="mailto:ttpvt01@gmail.com"
            className="transition-transform duration-200"
          >
            <Image
              src="/email.png"
              alt="email"
              width={50}
              height={50}
              className="mx-auto mb-6"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/tejas-tyagi-1281a5223"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200"
          >
            <Image
              src="/linkedin.png"
              alt="linkedin"
              width={50}
              height={50}
              className="mx-auto mb-6"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
