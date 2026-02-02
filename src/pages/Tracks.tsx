import { Navbar } from "@/components/Navbar";
import { SpaceBackground } from "@/components/SpaceBackground";
import { useEffect } from "react";

const tracks = [
  {
    title: "AI & Machine Learning",
    description: "Build intelligent systems that learn from data and automate decisions.",
    examples: "Fake news detection, resume screening, AI tutor."
  },
  {
    title: "Sustainability & Climate",
    description: "Solutions for environment, energy, and climate challenges.",
    examples: "Carbon footprint tracker, smart waste management, water conservation."
  },
  {
    title: "FinTech",
    description: "Innovations in finance, banking, and digital payments.",
    examples: "Budgeting app, fraud detection, micro-loan platform."
  },
  {
    title: "Healthcare",
    description: "Improve health and medical systems using technology.",
    examples: "Symptom checker, medicine reminder, mental health chatbot."
  },
  {
    title: "Open Innovation",
    description: "Any creative idea that does not fit other tracks.",
    examples: "Productivity tools, social platforms, experimental tech."
  }
];

export default function Tracks() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <SpaceBackground />
      <Navbar />
      
      <main className="relative z-10 min-h-screen pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 text-center tracking-tight">
          <span className="text-gradient-interstellar">Competition Tracks</span>
        </h1>
        <p className="text-white/60 text-center text-lg mb-16 max-w-3xl mx-auto">
          Choose your domain and build innovative solutions that make a real impact
        </p>
        
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="bg-black/70 border border-primary/20 rounded-2xl p-7 flex flex-col shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_0_rgba(0,212,255,0.2)] hover:border-primary/60 group backdrop-blur-sm"
            >
              <h2 className="font-display text-2xl font-bold text-primary mb-3 group-hover:text-cyan-400 transition-colors">
                {track.title}
              </h2>
              <p className="text-white/80 mb-3 text-base font-medium leading-relaxed">{track.description}</p>
              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-white/50 text-sm">
                  <span className="text-primary font-semibold">Examples:</span> {track.examples}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
