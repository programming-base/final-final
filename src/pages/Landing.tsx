import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { FloatingIcons } from "@/components/FloatingIcons";
import { SpaceBackground } from "@/components/SpaceBackground";
import { Section } from "@/components/Section";
import { TrackCard } from "@/components/TrackCard";
import { useTracks } from "@/hooks/use-tracks";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Calendar, Users, Cpu, ArrowRight, Lightbulb, Code, Presentation, Award, Rocket, Clock } from "lucide-react";
import { useState, useEffect } from "react";

function CountdownTimer() {
  const targetDate = new Date("2026-02-15T00:01:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-6">
      {timeUnits.map((unit, i) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
          className="perspective-container"
        >
          <div className="timer-digit rounded-2xl p-3 md:p-6 min-w-[70px] md:min-w-[100px] text-center">
            <div className="font-orbitron text-2xl md:text-5xl font-bold text-white mb-1">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest">{unit.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Landing() {
  const { data: tracks } = useTracks();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Handle hash navigation and cross-route scrolling
  useEffect(() => {
    const hash = window.location.hash;
    const pendingScroll = sessionStorage.getItem('scrollTarget');
    
    // Determine scroll target (hash in URL or pending from sessionStorage)
    const scrollTarget = hash || pendingScroll;
    
    // Clear pending scroll from sessionStorage
    if (pendingScroll) {
      sessionStorage.removeItem('scrollTarget');
    }
    
    // Only proceed if there's a valid scroll target
    if (scrollTarget && scrollTarget.length > 1) {
      // Wait for page to fully render
      const scrollToTarget = () => {
        const element = document.querySelector(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      // Give DOM time to render
      const timer = setTimeout(scrollToTarget, 200);

      return () => {
        clearTimeout(timer);
      };
    } else {
      // No scroll target - ensure we're at the top
      window.scrollTo(0, 0);
    }
  }, []);

  const steps = [
    {
      number: "01",
      icon: Lightbulb,
      title: "Round 1 – Ideation",
      description: "Submit problem understanding and solution approach.",
      duration: "15-16 Feb 2026 (Online)"
    },
    {
      number: "02",
      icon: Code,
      title: "Round 2 – Prototype",
      description: "Develop a functional prototype or PoC.",
      duration: "17-18 Feb 2026 (Online)"
    },
    {
      number: "03",
      icon: Presentation,
      title: "Round 3 – Final Build",
      description: "Live demo and final presentation at TCET, Mumbai.",
      duration: "20 Feb 2026 (Offline)"
    },
    {
      number: "04",
      icon: Award,
      title: "Registration Details",
      description: "Fee: ₹400 (for finalists only). Deadline: 13 Feb 2026.",
      duration: "Open to All India UG"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      <ParticleBackground />
      <SpaceBackground />
      <FloatingIcons />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 overflow-hidden">
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none tracking-tight mb-3"
          >
            <span className="block text-white text-3d">INNOV</span>
            <span className="block text-gradient-interstellar drop-shadow-[0_0_30px_rgba(0,212,255,0.2)]">
              GENIUS
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-primary font-bold tracking-[0.3em] text-sm md:text-base uppercase mb-6"
          >
            A National-Level Ideathon
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 font-light leading-relaxed"
          >
            Where creativity meets code. Ignite innovation. Build real solutions.
            <span className="flex items-center justify-center gap-2 mt-4 text-sm text-white/40">
              Powered by 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 796" className="h-4 inline-block" style={{ fill: '#33639E' }}>
                <g>
                  <path d="M1008.9,342.7c-0.6-28.8-20.4-43-59.9-43c-28.8,0-48.1,11.9-48.1,29.4c0,13,5.7,17.5,28.8,24.9l105.2,30   c41.8,12.4,62.8,39,62.8,80.3c0,31.1-14.1,61.1-37.9,79.7c-23.8,18.7-57.7,28.3-101.8,28.3c-97.3,0-148.7-36.2-151-106.3h81.4   c3.4,17,7.4,23.8,15.8,30c10.7,7.9,27.1,11.3,49.2,11.3c38.5,0,61.6-11.9,61.6-31.1c0-13-7.4-19.2-27.7-26l-99-30.5   c-31.1-10.2-40.7-15.3-52-26.6c-11.3-12.4-17.5-30.5-17.5-52c0-65.6,50.3-106.3,131.8-106.3c86,0,138,40.7,139.1,108L1008.9,342.7z"/>
                  <path d="M1297.3,300.9h-46.4v173.6c0,28.3,5.1,35.1,27.1,35.1c6.8,0,10.7-0.6,19.2-1.7v57.7   c-15.3,4.5-28.8,6.2-48.1,6.2c-54.3,0-81.4-24.9-81.4-75.2V300.3H1127v-54.9h40.7V160h83.1v85.4h46.4v55.5H1297.3z"/>
                  <path d="M1647.4,405.5c0,102.9-60.5,166.8-158.4,166.8c-98.4,0-158.3-63.9-158.3-169.1c0-104.6,59.9-169.1,157.8-169.1   C1589.1,234.1,1647.4,297.5,1647.4,405.5L1647.4,405.5z M1413.8,403.2c0,61.6,30,102.4,75.2,102.4c44.7,0,75.2-41.3,75.2-101.2   c0-62.8-29.4-103.5-75.2-103.5C1444.3,300.9,1413.8,342.1,1413.8,403.2z"/>
                  <path d="M1777.2,286.7c20.4-35.6,48.6-52.6,88.8-52.6c38.5,0,78,20.4,99.5,50.3c21.5,29.4,34.5,74.6,34.5,119.3   c0,96.7-57.1,169.1-134,169.1c-40.2,0-69-16.4-88.8-52v166.8h-83.1V239.8h83.1V286.7L1777.2,286.7z M1777.2,403.8   c0,59.4,27.7,99.5,70.1,99.5c41.3,0,70.1-40.2,70.1-98.4c0-61.6-27.7-101.8-70.1-101.8C1804.9,303.7,1777.2,343.8,1777.2,403.8z"/>
                  <path d="M397.6,0.4C178.6,0.4,0,179,0,398s178.6,397.6,397.6,397.6S795.2,617,795.2,398C795.1,179,616.5,0.4,397.6,0.4   z M357.7,559h-82.6v-37.3c-23.8,36.2-52.6,51.5-96.1,51.5c-69,0-107.5-39.6-107.5-110.3V240.6h83.1v204.7   c0,38.5,17.5,57.1,53.2,57.1c40.7,0,66.7-24.9,66.7-62.8V240h83.1v319H357.7z M640.5,559V362.2c0-37.9-17.5-57.1-53.2-57.1   c-40.7,0-66.7,24.9-66.7,62.8V559h-83.1V240h82.6v0.6v45.8c23.8-36.2,52.6-51.5,96.1-51.5c69,0,107.5,39.6,107.5,110.3V559H640.5z"/>
                </g>
              </svg>
            </span>
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-white/40 text-sm uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" /> Event Starts In
            </p>
            <CountdownTimer />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center mb-12"
          >
            <Button 
              size="lg" 
              onClick={() => window.open('https://unstop.com/hackathons/innovgenius-2026-hackathon-acm-tcet-1631419', '_blank')}
              className="h-14 px-10 rounded-full bg-primary text-primary-foreground hover:bg-cyan-400 hover:scale-105 transition-all duration-300 font-bold text-lg glow-button"
            >
              Register Now
            </Button>
          </motion.div>
        </div>
        
        </div>

      {/* Stats Section */}
      <div className="border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Prize Pool", value: "₹30k+" },
            { label: "Team Size", value: "2-4" },
            { label: "Rounds", value: "3" },
            { label: "Location", value: "Mumbai" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="text-center p-4 rounded-xl hover-shadow cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{stat.value}</div>
              <div className="text-primary text-xs tracking-widest uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Ideathon Section */}
      <Section id="about-ideathon" className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">What Is</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
                INNOV<span className="text-gradient-interstellar">GENIUS</span>?
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                InnovGenius 2026 is a national-level ideathon where ideas transform into impactful tech solutions.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Collaborate, innovate, and build for real-world problems.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Lightbulb, label: "Brainstorm real ideas" },
                  { icon: Code, label: "Build functional solutions" },
                  { icon: Users, label: "Collaborate with top students" },
                  { icon: Presentation, label: "Present to industry judges" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover-shadow cursor-default"
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="text-white/80 text-sm font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative perspective-container"
            >
              <div className="card-3d">
                <div className="card-3d-inner aspect-video rounded-3xl overflow-hidden relative border border-primary/20 glass-gold">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 shimmer-gold" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-5xl font-orbitron font-bold text-gradient-gold mb-2">48:00:00</div>
                    <div className="text-white/60 text-sm tracking-widest uppercase">Hours of Pure Innovation</div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <motion.div 
                animate={{ y: [0, -20, 0], rotateZ: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary to-[#9E7F0D] rounded-full blur-[60px] opacity-30" 
              />
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 w-24 h-24 border-2 border-primary/30 rounded-full" 
              />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Steps / Timeline Section */}
      <Section id="steps">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Event Timeline</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center hover:border-primary/30 transition-colors click-shadow cursor-pointer"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                <step.icon className="w-7 h-7" />
              </div>
              <div className="text-primary/60 text-sm font-medium mb-2">{step.number}</div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-3">{step.description}</p>
              <div className="text-primary text-xs font-medium">{step.duration}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Tracks Section */}
      <Section id="tracks">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Who Can Participate?</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks?.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          )) || (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-80 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
            ))
          )}
        </div>
      </Section>

      {/* About / Features Section */}
      <Section id="about" className="bg-gradient-to-b from-transparent to-black">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              <span className="font-body">Ready to</span> <br />
              <span className="font-display text-gradient-interstellar italic">Build?</span>
            </h2>
            <div className="space-y-8">
              {[
                { icon: Users, title: "Team Size: 2–4 members", desc: "Open to undergraduate students (All India)." },
                { icon: Trophy, title: "Inter-college teams allowed", desc: "Collaborate across institutions and specializations." },
                { icon: Cpu, title: "Registration: ₹400", desc: "Only for final round selected teams. Deadline: 13 February 2026." },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-6 p-4 rounded-xl hover:bg-white/5 hover-shadow transition-all cursor-default"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-black border border-primary/30 flex items-center justify-center text-primary">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative perspective-container">
             {/* Decorative Image Placeholder - 3D Cube */}
             <div className="aspect-square rounded-3xl overflow-hidden relative border border-white/10 bg-black/40">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=2864&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-5xl font-display font-bold text-gradient-interstellar mb-2">3</div>
                    <div className="text-primary text-sm tracking-widest uppercase">Rounds of Innovation</div>
                  </div>
               </div>
          </div>
        </div>
      </Section>

      {/* Prizes Section */}
      <Section id="prizes">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Rewards</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Prize pool worth ₹30,000+ | Cash prizes and internship opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto">
          {/* 2nd Place */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group click-shadow cursor-pointer"
          >
            <div className="text-4xl font-bold text-white/20 mb-4 group-hover:text-primary/20 transition-colors">02</div>
            <div className="text-2xl font-bold text-white mb-2">Runner Up</div>
            <div className="text-3xl font-display font-bold text-primary mb-6">₹10,000</div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>Cash Prize</li>
              <li>Certificate</li>
              <li>Internship Opportunity</li>
            </ul>
          </motion.div>

          {/* 1st Place */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-b from-cyan-500/10 to-black border border-cyan-400/30 rounded-2xl p-10 text-center relative overflow-hidden order-first md:order-none z-10 transform md:-translate-y-8 click-shadow cursor-pointer"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                <Trophy className="text-white w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">Grand Prize</div>
              <div className="text-5xl font-display font-bold text-gradient-interstellar mb-8">₹15,000</div>
              <ul className="text-sm text-white/80 space-y-3 font-medium">
                <li>Cash Prize</li>
                <li>Certificate of Excellence</li>
                <li>Internship Opportunity</li>
                <li>Mentorship Access</li>
              </ul>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group click-shadow cursor-pointer"
          >
            <div className="text-4xl font-bold text-white/20 mb-4 group-hover:text-primary/20 transition-colors">03</div>
            <div className="text-2xl font-bold text-white mb-2">Third Place</div>
            <div className="text-3xl font-display font-bold text-primary mb-6">₹5,000</div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>Cash Prize</li>
              <li>Certificate</li>
              <li>Goodies</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8 opacity-50 hover:opacity-100 transition-opacity">
            <span className="font-display font-bold text-3xl md:text-4xl tracking-tight text-white">
              INNOV<span className="text-gradient-interstellar">GENIUS</span>
            </span>
          </div>
          <p className="text-white/40 text-sm">
            Organized by TCET–ACM SIGITE | In collaboration with CSI UMIT, TCET–ACM SIGAI & TCET Rotaract Club
          </p>
        </div>
      </footer>
    </div>
  );
}
