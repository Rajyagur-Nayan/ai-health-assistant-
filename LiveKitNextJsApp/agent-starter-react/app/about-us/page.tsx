'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Handshake, HeartPulse, Lightbulb, ShieldCheck, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Mock Data for Team Members ---
const teamMembers = [
  {
    name: 'Dr. Alistair Finch',
    role: 'Founder & Chief Medical Officer',
    bio: 'With over 20 years of experience in clinical practice, Dr. Finch founded MediAI to bridge the gap between technology and patient care.',
    avatarUrl: 'https://placehold.co/400x400/222/FFF?text=AF',
  },
  {
    name: 'Jasmine Kaur',
    role: 'CEO & Lead AI Architect',
    bio: 'Jasmine leads our technical vision, specializing in machine learning models for diagnostic support and personalized health.',
    avatarUrl: 'https://placehold.co/400x400/333/FFF?text=JK',
  },
  {
    name: 'Leo Chen',
    role: 'Head of Product',
    bio: 'Leo is dedicated to creating an intuitive and empathetic user experience, ensuring our platform is accessible to everyone.',
    avatarUrl: 'https://placehold.co/400x400/444/FFF?text=LC',
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// --- Main About Us Component ---
export default function AboutUsPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      {/* --- Light Mode Navbar --- */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="size-7 text-indigo-600" />
            <span className="text-xl font-bold tracking-tight text-gray-900">MediAI</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
              Home
            </Link>
            <a
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              Dashboard
            </a>
            <a href="/about" className="text-sm font-semibold text-indigo-600">
              About Us
            </a>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100"
            >
              Sign In
            </Button>
          </motion.div>
        </div>
      </motion.nav>

      {/* --- Main Content Area --- */}
      <main className="container mx-auto px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Empowering Health Through Intelligent Technology
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            MediAI was founded on the simple belief that everyone deserves access to clear,
            personalized, and compassionate healthcare guidance. We're a team of doctors, engineers,
            and innovators dedicated to making that a reality.
          </p>
        </motion.section>

        {/* Our Mission Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="my-16 text-center sm:my-24"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900">
            Our Mission
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-4 text-lg leading-8 text-gray-600"
          >
            <Target className="size-8 flex-shrink-0 text-indigo-600" />
            To provide an intelligent, empathetic, and instantly accessible health companion that
            empowers individuals to make confident decisions about their well-being.
          </motion.p>
        </motion.section>

        {/* Team Section */}
        <section className="my-16 sm:my-24">
          <h2 className="text-center text-3xl font-bold text-gray-900">Meet Our Leaders</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-4 h-32 w-32">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="size-full rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm font-medium text-indigo-600">{member.role}</p>
                <p className="mt-2 text-sm text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Our Values Section */}
        <section className="my-16 sm:my-24">
          <h2 className="text-center text-3xl font-bold text-gray-900">Our Core Values</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: <Users />,
                title: 'Patient-First',
                text: 'Our users are at the heart of every decision we make.',
              },
              {
                icon: <Lightbulb />,
                title: 'Innovation',
                text: 'We constantly push the boundaries of AI to improve care.',
              },
              {
                icon: <ShieldCheck />,
                title: 'Trust & Safety',
                text: 'We are committed to data privacy and clinical accuracy.',
              },
              {
                icon: <Handshake />,
                title: 'Accessibility',
                text: 'We build inclusive tools that are easy for anyone to use.',
              },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center"
              >
                <div className="mb-4 text-indigo-600">{value.icon}</div>
                <h3 className="font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{value.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}
