import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Clock,
  HeartPulse,
  MessageCircle,
  // New icon
  Search,
  // New icon
  ShieldCheck,
  Sparkles,
  // New icon
  Stethoscope,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeProps {
  disabled: boolean;
  startButtonText: string;
  onStartCall: () => void;
}

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export const Welcome = ({
  disabled,
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeProps) => {
  return (
    <div
      ref={ref}
      className="relative flex min-h-svh w-full flex-col overflow-x-hidden bg-gray-50 text-gray-800"
    >
      {/* Background Gradient Blur */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2">
        <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#9089fc] to-[#4f46e5] opacity-20" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 z-50 w-full bg-white/60 shadow-sm backdrop-blur-lg"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="size-7 text-indigo-600" />
            <span className="text-xl font-bold tracking-tight text-gray-900">MediAI</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="/features" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
              Features
            </a>
            <a
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
              About Us
            </a>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="border-gray-300">
              Sign In
            </Button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Hero Section */}
      <main
        inert={disabled ? '' : undefined} // Updated for better accessibility practices
        className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 flex size-16 items-center justify-center rounded-full bg-indigo-100"
          >
            <BrainCircuit className="size-9 text-indigo-600" />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Your Intelligent Health Companion
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg leading-8 text-gray-600"
          >
            Get instant, personalized health insights. Chat with our advanced AI to understand
            symptoms, receive wellness advice, and navigate your health journey with confidence.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={onStartCall}
                className="w-64 rounded-full bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg hover:bg-indigo-700"
              >
                {startButtonText}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto w-full max-w-5xl py-16 md:py-24"
      >
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {[
            {
              icon: <Stethoscope className="size-7 text-indigo-600" />,
              title: 'Symptom Analysis',
              description:
                'Describe your symptoms and our AI will provide potential causes and recommendations.',
            },
            {
              icon: <Clock className="size-7 text-indigo-600" />,
              title: '24/7 Availability',
              description:
                'Your health assistant is always online, ready to help you anytime, anywhere.',
            },
            {
              icon: <ShieldCheck className="size-7 text-indigo-600" />,
              title: 'Private & Secure',
              description:
                'Your conversations are confidential, and your data is encrypted and protected.',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center rounded-xl bg-white/50 p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-indigo-100">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* === NEW: How It Works Section === */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full bg-white py-16 md:py-24"
      >
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Simple Steps to a Healthier You
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          >
            Getting started is easy. Follow these simple steps to begin your journey with MediAI.
          </motion.p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                icon: <MessageCircle className="size-8 text-indigo-600" />,
                title: '1. Start the Chat',
                description:
                  'Simply click the start button and begin typing your health concerns in natural language.',
              },
              {
                icon: <Search className="size-8 text-indigo-600" />,
                title: '2. Describe Your Symptoms',
                description:
                  'Provide as much detail as you can. Our AI will ask clarifying questions to better understand.',
              },
              {
                icon: <Sparkles className="size-8 text-indigo-600" />,
                title: '3. Receive Insights',
                description:
                  'Get instant analysis, potential next steps, and helpful wellness tips based on your input.',
              },
            ].map((step) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <div className="flex size-16 items-center justify-center rounded-full border-2 border-indigo-200 bg-indigo-50">
                  {step.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* === NEW: Testimonials Section === */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto w-full max-w-6xl py-16 md:py-24"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Discover how MediAI is helping people take control of their health.
          </p>
        </motion.div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
          {[
            {
              quote:
                'This is incredible. I had a nagging concern and got a clear, understandable explanation in minutes. It really helped calm my anxiety before I could see a doctor.',
              author: 'Sarah L.',
              role: 'Graphic Designer',
              avatar: 'https://placehold.co/100x100/e9d5ff/4f46e5/png?text=SL',
            },
            {
              quote:
                "As a busy parent, I don't always have time to research symptoms for my kids. MediAI is like having a health encyclopedia on standby. A real lifesaver!",
              author: 'Michael B.',
              role: 'Father of Two',
              avatar: 'https://placehold.co/100x100/c7d2fe/4f46e5/png?text=MB',
            },
          ].map((testimonial) => (
            <motion.figure
              key={testimonial.author}
              variants={itemVariants}
              className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5"
            >
              <blockquote className="text-gray-900">
                <p>{`“${testimonial.quote}”`}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <img className="size-10 rounded-full bg-gray-50" src={testimonial.avatar} alt="" />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.section>

      {/* === NEW: Final CTA Section === */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="w-full"
      >
        <div className="container mx-auto my-16 max-w-5xl rounded-2xl bg-indigo-600 px-6 py-16 text-center sm:py-20 lg:px-8">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Ready to Take Control of Your Health?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-xl text-lg text-indigo-100"
          >
            Start your first conversation now. It’s free, secure, and you might learn something
            valuable in just a few minutes.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={onStartCall}
                className="w-64 rounded-full bg-white px-8 py-4 font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50"
              >
                {startButtonText}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="w-full bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} MediAI. All rights reserved.
            </p>
            <div className="mt-4 flex gap-6 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">
                Contact
              </a>
            </div>
          </div>
          <p className="mt-8 border-t border-gray-200 pt-8 text-center text-xs text-gray-500">
            <strong>Disclaimer:</strong> MediAI is an AI-powered assistant and not a substitute for
            professional medical advice, diagnosis, or treatment. Always seek the advice of your
            physician.
          </p>
        </div>
      </footer>
    </div>
  );
};
