import type { Metadata } from 'next';
import Link from 'next/link';
// Assuming you have this component
import {
  BrainCircuit,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Smile,
  Stethoscope,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Features | MediAI',
  description:
    'Explore the intelligent and compassionate features of MediAI, your personal health and mental wellness companion.',
};

// A simple Navbar component for demonstration
const Navbar = () => (
  <nav className="fixed top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-lg">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <BrainCircuit className="size-7 text-indigo-600" />
        <span className="text-xl font-bold tracking-tight text-gray-900">MediAI</span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
          Home
        </Link>
        <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
          Dashboard
        </a>
        <a href="/about-us" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
          About Us
        </a>
      </div>
      <div className="hidden md:block">
        <Button variant="outline" size="sm">
          Start Chat
        </Button>
      </div>
    </div>
  </nav>
);

// A simple Footer component with the essential disclaimer
const Footer = () => (
  <footer className="w-full border-t bg-white">
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} MediAI. All rights reserved.
        </p>
        <p className="mx-auto mt-6 max-w-3xl border-t border-gray-200 pt-6 text-center text-xs text-gray-600">
          <strong>Important Disclaimer:</strong> MediAI is an AI-powered assistant designed for
          informational and supportive purposes. It is not a substitute for professional medical
          advice, diagnosis, or treatment. Always seek the advice of your physician or other
          qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>
    </div>
  </footer>
);

// The main component for the features page
export default function FeaturesPage() {
  const features = [
    {
      icon: <Stethoscope className="size-8 text-white" />,
      title: 'Instant Symptom Analysis',
      description:
        'Describe your physical symptoms in plain language, and MediAI will analyze the information to provide you with potential causes and insights. Our goal is to help you understand what might be happening in your body so you can have a more informed conversation with a healthcare professional.',
      details: [
        'Natural language understanding.',
        'Covers a wide range of common symptoms.',
        'Provides helpful next steps.',
      ],
    },
    {
      icon: <HeartHandshake className="size-8 text-white" />,
      title: 'Compassionate Mental Health Support',
      description:
        'Your mental well-being is our priority. MediAI provides a safe, confidential, and non-judgmental space to talk about feelings of stress, anxiety, or depression. We offer supportive conversations and evidence-based coping strategies to help you navigate difficult emotions.',
      details: [
        'A dedicated safe space, available 24/7.',
        'Guidance on mindfulness and relaxation techniques.',
        'Empathetic listening without judgment.',
      ],
    },
    {
      icon: <ShieldCheck className="size-8 text-white" />,
      title: 'Private and Secure by Design',
      description:
        'Your health is personal, and your privacy is paramount. All conversations with MediAI are confidential and encrypted. We are committed to protecting your data, so you can speak freely and securely.',
      details: [
        'End-to-end encryption for all conversations.',
        'Anonymous and confidential interactions.',
        'We will never share your personal health data.',
      ],
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-20 sm:py-28">
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/2 aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 bg-gradient-to-tr from-[#9089fc] to-[#4f46e5] opacity-20" />
          </div>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Features Designed for Your Well-being
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Discover how MediAI&apos;s intelligent and compassionate tools can support your
              physical and mental health journey, anytime you need it.
            </p>
          </div>
        </section>

        {/* Detailed Features Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your Health Companion, Explained
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We combine technology with empathy to deliver support you can count on.
              </p>
            </div>
            <div className="mt-16 space-y-16">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center gap-8 md:flex-row md:gap-12"
                >
                  <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 rounded-lg bg-indigo-600 p-3">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="mt-4 leading-7 text-gray-600">{feature.description}</p>
                    <ul className="mt-6 space-y-2">
                      {feature.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-3">
                          <Smile className="size-5 flex-shrink-0 text-indigo-500" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:w-1/2">
                    <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-gray-200">
                      <p className="text-gray-500 italic">[Illustrative Graphic Here]</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-white">
          <div className="container mx-auto my-16 max-w-5xl rounded-2xl bg-indigo-600 px-6 py-16 text-center sm:py-20 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready for a Healthier Tomorrow?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
              Start a confidential conversation with MediAI today. It’s free, secure, and available
              whenever you need to talk.
            </p>
            <div className="mt-10">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                Start Your Conversation
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
