/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Zap, 
  MessageSquare, 
  X, 
  Send,
  ArrowRight,
  Menu,
  ChevronRight,
  Shield,
  Phone,
  MessageCircle,
  Cpu,
  Database,
  Globe,
  Layers,
  Terminal,
  Settings,
  HardDrive,
  Trophy,
  Award,
  FileText,
  Download
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { chatWithPortfolio } from './services/geminiService';
import Markdown from 'react-markdown';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const CodeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const codeSnippets = [
      'const alex = new Developer();',
      'alex.skills = ["AI", "Security", "Design"];',
      'function buildFuture() { return excellence; }',
      'import { innovation } from "future";',
      '01010110 01001001 01010000',
      'while(true) { alex.create(); }',
      'git commit -m "Elite Mastery"',
      'docker-compose up -d',
      'npm install success',
      'sudo apt-get upgrade talent',
      'export default JesseAmukowa;',
      'interface Professional { skills: string[]; }'
    ];

    const columns = Math.floor(width / 200);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * 200 + Math.random() * 50,
        y: Math.random() * height,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        speed: 0.5 + Math.random() * 1.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 215, 0, 0.03)'; // Very subtle gold
      ctx.font = '10px "JetBrains Mono"';

      drops.forEach((drop) => {
        ctx.fillText(drop.text, drop.x, drop.y);
        drop.y += drop.speed;

        if (drop.y > height) {
          drop.y = -20;
          drop.x = Math.random() * width;
          drop.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }
      });

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none opacity-40"
    />
  );
};

const FloatingTech = () => {
  const icons = [
    { Icon: Cpu, size: 24 },
    { Icon: Database, size: 20 },
    { Icon: Globe, size: 28 },
    { Icon: Layers, size: 22 },
    { Icon: Terminal, size: 26 },
    { Icon: Settings, size: 18 },
    { Icon: HardDrive, size: 24 },
    { Icon: Code2, size: 30 },
    { Icon: Zap, size: 22 },
    { Icon: Shield, size: 20 }
  ];

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden opacity-20">
      {Array.from({ length: 15 }).map((_, i) => {
        const { Icon, size } = icons[i % icons.length];
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const duration = 15 + Math.random() * 25;
        const delay = Math.random() * 10;

        return (
          <motion.div
            key={i}
            initial={{ x: `${randomX}%`, y: `${randomY}%`, opacity: 0 }}
            animate={{ 
              y: [`${randomY}%`, `${(randomY + 10) % 100}%`, `${randomY}%`],
              x: [`${randomX}%`, `${(randomX + 5) % 100}%`, `${randomX}%`],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration, 
              repeat: Infinity, 
              ease: "linear",
              delay
            }}
            className="absolute text-brand-accent/30"
          >
            <Icon size={size} strokeWidth={1} />
          </motion.div>
        );
      })}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Projects', 'Skills', 'Achievements', 'Experience', 'Contact'];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-2 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-brand-bg/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-left justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-black tracking-tighter flex items-center gap-2"
          >
            <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center text-black">
              J.A
            </div>
            <span className="text-gradient">JESSE AMUKOWA</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-white/60">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="hover:text-brand-accent transition-colors tracking-widest uppercase text-[11px]"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact"
              className="gold-gradient text-black px-6 py-2 rounded-full text-xs font-black hover:scale-105 transition-all gold-glow"
            >
              HIRE ME
            </a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white p-2"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-brand-bg flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-16">
              <div className="text-xl font-black tracking-tighter flex items-center gap-2">
                <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center text-black">
                  <Code2 size={18} />
                </div>
                <span className="text-gradient">JESSE AMUKOWA</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black tracking-tighter uppercase text-white/40 hover:text-brand-accent transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="gold-gradient text-black px-8 py-4 rounded-2xl text-center font-black tracking-widest uppercase mt-4"
              >
                HIRE ME
              </motion.a>
            </div>

            <div className="mt-auto flex gap-6 text-white/20">
              <Github size={24} />
              <Linkedin size={24} />
              <Twitter size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full glass text-[10px] font-black tracking-[0.3em] uppercase text-brand-accent border-brand-accent/20">
                AVAILABLE FOR HIRE
              </span>
              <span className="text-white/30 font-mono text-[10px] tracking-widest uppercase">EST. 2000</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.8] tracking-tighter mb-8 text-gradient uppercase">
              JESSE <br /> AMUKOWA
            </h1>

            <div className="space-y-6 mb-12">
              <div className="flex flex-wrap gap-x-6 md:gap-x-8 gap-y-4">
                <div>
                  <div className="text-[10px] font-black tracking-[0.3em] text-brand-accent uppercase mb-1">Age</div>
                  <div className="text-lg md:text-xl font-bold text-white">21 YEARS</div>
                </div>
                <div>
                  <div className="text-[10px] font-black tracking-[0.3em] text-brand-accent uppercase mb-1">Specialization</div>
                  <div className="text-lg md:text-xl font-bold text-white">TECH SPECIALIST</div>
                </div>
                <div>
                  <div className="text-[10px] font-black tracking-[0.3em] text-brand-accent uppercase mb-1">Location</div>
                  <div className="text-lg md:text-xl font-bold text-white">GLOBAL / REMOTE</div>
                </div>
              </div>
              
              <p className="max-w-xl text-lg md:text-xl text-white/60 leading-relaxed font-light">
                A passionate engineer bridging the gap between Design, Cybersecurity, and AI/ML with gold-standard precision and elite digital mastery.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a href="#projects" className="group gold-gradient text-black px-10 py-5 rounded-full font-black flex items-center gap-3 hover:scale-105 transition-all w-full sm:w-auto justify-center gold-glow">
                VIEW PROJECTS <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="glass px-10 py-5 rounded-full font-black hover:bg-white/10 transition-all w-full sm:w-auto border-white/10 tracking-widest text-xs text-center">
                GET IN TOUCH
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-12 w-[65%] mx-auto aspect-[3.3/5.3] rounded-[30px] overflow-hidden border border-white/10 gold-glow group">
              <img 
                src="/public/assets/jessepic.png" 
                alt="Jesse Amukowa" 
                className="w-full h-full object-fit hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="text-white">
                  <div className="text-brand-accent font-black text-xs tracking-widest uppercase mb-1">Jesse Amukowa</div>
                  <div className="text-sm font-light opacity-60">Tech Specialist & Designer</div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-[10%] right-[5%] w-24 h-24 border-t-2 border-r-2 border-brand-accent/30 rounded-tr-[32px]" />
            <div className="absolute bottom-[10%] left-[5%] w-24 h-24 border-b-2 border-l-2 border-brand-accent/30 rounded-bl-[32px]" />
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] gold-gradient opacity-5 blur-[100px]" />
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ title, description, tags, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative glass rounded-3xl overflow-hidden cursor-pointer"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-white/40 border border-white/10 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6">{description}</p>
        <div className="flex items-center gap-4">
          <button className="text-xs font-bold flex items-center gap-1 hover:text-brand-accent transition-colors">
            LIVE DEMO <ExternalLink size={14} /> 
          </button>
          <button className="text-xs font-bold flex items-center gap-1 hover:text-brand-accent transition-colors">
            GITHUB <Github size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "HAVEN APP - Mental Health Platform",
      description: "A comprehensive mental health platform offering self-assessment tools, personalized resources, and a supportive community to promote well-being and resilience in Kenyan Schools where Mental Health has been a real problem",
      tags: ["Flutter", "Dart", "Firebase", "FastAPI","Gemini API"],
      image: "/src/assets/haven.jpg"
    },
    {
      title: "JK BRAND -Company website",
      description: "A sleek and modern company website showcasing our portfolio, services, and team, designed to attract high-end clients and establish a strong online presence.",
      tags: ["JavaScript", "React", "Gemini API", "PostgreSQL"],
      image: "/src/assets/jk.jpg"
    },
    {
      title: "TRACKIT Personal Finance Manager",
      description: "A minimalist personal finance manager with intuitive budget tracking, expense categorization, and financial insights.",
      tags: ["JAVA", "SQLite", "Gemini API", "Framer Motion"],
      image: "/src/assets/Trackit.jpg"
    }
  ];

  return (
    <section id="projects" className="py-32 bg-brand-bg relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-brand-accent font-mono text-sm mb-4 block tracking-widest">01 / PROJECTS</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">SELECTED  <span className="text-gradient">WORKS</span></h2>
          </div>
          <p className="max-w-md text-white/50 text-lg leading-relaxed font-light">
            A curated selection of high-end digital products engineered for excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    {
      title: "Engineering",
      icon: <Code2 size={20} />,
      skills: ["Frontend Developer", "Mobile App Developer", "Database", "DevOps"]
    },
    {
      title: "Design & Creative",
      icon: <Palette size={20} />,
      skills: ["Graphic Designer", "Adobe Suite", "Blender", "Inkscape", "Figma"]
    },
    {
      title: "AI & Data Science",
      icon: <Zap size={20} />,
      skills: ["AI/ML", "Data Science", "Gemini API", "Python"]
    },
    {
      title: "Security & Systems",
      icon: <Shield size={20} />,
      skills: ["Cybersecurity (System)", "Wireshark", "Linux", "Docker"]
    },
    {
      title: "Productivity & Tools",
      icon: <ArrowRight size={20} />,
      skills: ["Git", "Vercel", "MS Office Suite"]
    }
  ];

  return (
    <section id="skills" className="py-32 bg-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="text-brand-accent font-mono text-sm mb-4 block tracking-widest">02 / EXPERTISE</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">TECHNICAL <span className="text-gradient">STACK</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) => (
                  <span key={skill} className="glass px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-accent hover:text-black transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const roles = [
    {
      company: "MUNCHIFY",
      role: "Administator/ Head of IT",
      period: "2026 — Present",
      description: "To oversee all information technology functions within the organization. This includes managing IT staff, overseeing departmental budgets, ensuring network security, and implementing new software or hardware systems to improve operational efficiency"
    },
    {
      company: "JK BRAND",
      role: "UI/UX Developer/ Graphic Designer",
      period: "2025 — 2026",
      description: "Designed and developed user interfaces for web and mobile applications, focusing on usability and visual appeal."
    },
    {
      company: "RAMUO GENERAL SHOP AND ENTERPRISE",
      role: "IT support/ Customer Care",
      period: "2023— 2024",
      description: "Dedicated technical professional providing seamless hardware and software troubleshooting alongside high-quality user assistance to ensure business continuity. I specialize in translating complex technical issues into clear, actionable solutions for diverse stakeholders while maintaining a 98% resolution rate for system and network-related inquiries"
    }
  ];

  return (
    <section id="experience" className="py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="text-brand-accent font-mono text-sm mb-4 block tracking-widest">04 / JOURNEY</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">PROFESSIONAL <span className="text-gradient">TIMELINE</span></h2>
        </div>

        <div className="space-y-12">
          {roles.map((role, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 pb-12 border-b border-white/5 last:border-0"
            >
              <div className="text-white/40 font-mono text-sm pt-1">{role.period}</div>
              <div>
                <h3 className="text-3xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{role.role}</h3>
                <div className="text-xl text-white/80 mb-4">{role.company}</div>
                <p className="max-w-2xl text-white/50 leading-relaxed">{role.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const achievements = [
    {
      title: "Google Developers Group Mini Hackathon",
      organization: "Google On-campus Maseno University",
      date: "2025",
      type: "1st Place Winner",
      icon: <Trophy size={24} />,
      image: "/src/assets/images.png",
      description: "Awarded for developing a mental health mobile application created to help students overcome depression, Stress and anxiety. ."
    },
    {
      title: "Mobile Application Developer",
      organization: "Power Learn Project - Kenya",
      date: "2025",
      type: "Professional Certificate",
      icon: <Award size={24} />,
      image: "/src/assets/jesse Mobile Friendy PWAs with Dart and Flutter certificate.png",
      description: "Comprehensive certification covering Mobile Application Development and PWA's With Dart and flutter"
    },
    {
      title: "Cisco Certified Python Engineer",
      organization: "Cisco Network Academy",
      date: "2024",
      type: "Proffesional Certificate",
      icon: <Award size={24} />,
      image: "https://picsum.photos/seed/award2/1200/800",
      description: "Awarded for completing Pythin Essentials 1 and 2 on the Cisco academy platform"
    },
    {
      title: "CCNA 1/2",
      organization: "Cisco Networking Academy",
      date: "2024",
      type: "Certification",
      icon: <Award size={24} />,
      image: "https://picsum.photos/seed/cert2/1200/800",
      description: "Professional certification validating expertise in Networking ."
    }
  ];

  return (
    <section id="achievements" className="py-32 bg-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="text-brand-accent font-mono text-sm mb-4 block tracking-widest">03 / ACCOMPLISHMENTS</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase"> <span className="text-gradient">ACHIEVEMENTS</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedAchievement(item)}
              className="glass p-8 rounded-[32px] border border-white/5 hover:border-brand-accent/30 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-white/20 font-mono text-sm">{item.date}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{item.title}</h3>
              <div className="text-white/60 font-medium mb-4">{item.organization}</div>
              <div className="flex items-center justify-between">
                <div className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/5 text-brand-accent text-[10px] font-black tracking-widest uppercase border border-brand-accent/10">
                  {item.type}
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase text-white/20 group-hover:text-brand-accent transition-colors">View Certificate →</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CV Access Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-1 bg-gradient-to-r from-brand-accent/20 via-brand-accent/40 to-brand-accent/20 rounded-[40px]"
        >
          <div className="bg-brand-bg rounded-[38px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 rounded-3xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shadow-2xl">
                <FileText size={40} />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tighter uppercase mb-2">CURRICULUM VITAE</h3>
                <p className="text-white/50 text-lg font-light max-w-md">
                  A detailed breakdown of my technical expertise, professional experience, and academic background.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <a 
                href="/cv.pdf" 
                target="_blank"
                className="flex-1 md:flex-none gold-gradient text-black px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:scale-105 transition-all gold-glow"
              >
                <Download size={20} /> DOWNLOAD CV
              </a>
              <a 
                href="/cv.pdf" 
                target="_blank"
                className="flex-1 md:flex-none glass px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-white/10 transition-all border-white/10"
              >
                <ExternalLink size={20} /> VIEW ONLINE
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-5xl w-full bg-brand-bg rounded-3xl md:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[16/9] lg:aspect-auto h-full overflow-hidden bg-black">
                  <img 
                    src={selectedAchievement.image} 
                    alt={selectedAchievement.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-8">
                    {selectedAchievement.icon}
                  </div>
                  <div className="text-brand-accent font-mono text-xs tracking-[0.3em] uppercase mb-4">
                    {selectedAchievement.type}
                  </div>
                  <h3 className="text-4xl font-black tracking-tighter uppercase mb-4 leading-tight">
                    {selectedAchievement.title}
                  </h3>
                  <div className="text-xl font-bold text-white/80 mb-6">
                    {selectedAchievement.organization} • {selectedAchievement.date}
                  </div>
                  <p className="text-white/50 text-lg leading-relaxed font-light mb-8">
                    {selectedAchievement.description}
                  </p>
                  <button 
                    onClick={() => setSelectedAchievement(null)}
                    className="gold-gradient text-black px-10 py-4 rounded-full font-black tracking-widest uppercase text-xs self-start gold-glow"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => {
  const contactMethods = [
    { 
      name: "Email", 
      icon: <Mail size={24} />, 
      link: "mailto:amukowajesse@gmail.com", 
      label: "amukowajesse@gmail.com",
      color: "hover:bg-white hover:text-black"
    },
    { 
      name: "Phone", 
      icon: <Phone size={24} />, 
      link: "tel:+254795745018", 
      label: "+254795745018",
      color: "hover:bg-blue-500 hover:text-white"
    },
    { 
      name: "WhatsApp", 
      icon: <MessageCircle size={24} />, 
      link: "https://wa.me/0795745018", 
      label: "Chat on WhatsApp",
      color: "hover:bg-green-500 hover:text-white"
    },
    { 
      name: "LinkedIn", 
      icon: <Linkedin size={24} />, 
      link: "https://linkedin.com/in/alexrivera", 
      label: "Professional Profile",
      color: "hover:bg-blue-600 hover:text-white"
    },
    { 
      name: "GitHub", 
      icon: <Github size={24} />, 
      link: "https://github.com/Jesseamukowa", 
      label: "Code Repositories",
      color: "hover:bg-gray-800 hover:text-white"
    },
    { 
      name: "X (Twitter)", 
      icon: <Twitter size={24} />, 
      link: "https://x.com/alexrivera", 
      label: "Latest Updates",
      color: "hover:bg-black hover:text-white"
    }
  ];

  return (
    <section id="contact" className="py-32 gold-gradient text-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-none">
              LET'S BUILD <br /> THE <span className="text-white">FUTURE</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold opacity-90 uppercase tracking-widest">
              Currently available for Hiring and Collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method, idx) => (
              <motion.a
                key={idx}
                href={method.link}
                target={method.link.startsWith('http') ? "_blank" : undefined}
                rel={method.link.startsWith('http') ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-6 p-6 bg-black/5 border border-black/10 rounded-3xl transition-all duration-300 group",
                  method.color
                )}
              >
                <div className="w-14 h-14 rounded-2xl bg-black text-brand-accent flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  {method.icon}
                </div>
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">{method.name}</div>
                  <div className="text-lg font-bold truncate max-w-[200px]">{method.label}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithPortfolio(input, messages);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 md:bottom-20 right-0 w-[calc(100vw-2rem)] md:w-[400px] h-[500px] glass rounded-[32px] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 gold-gradient rounded-xl flex items-center justify-center text-black">
                  <Zap size={16} />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-black tracking-widest uppercase">Jesse Portfolio AI</div>
                  <div className="text-[9px] md:text-[10px] text-brand-accent font-bold uppercase tracking-widest">Online</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.length === 0 && (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mx-auto mb-4">
                    <MessageSquare size={32} />
                  </div>
                  <p className="text-white/40 text-sm font-light">
                    Ask me anything about Jesse's skills, projects, or background.
                  </p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={cn(
                  "flex flex-col",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-brand-accent text-black font-bold rounded-tr-none" 
                      : "bg-white/5 text-white/80 border border-white/10 rounded-tl-none"
                  )}>
                    <Markdown>{msg.parts[0].text}</Markdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-white/5 text-white/40 p-4 rounded-2xl rounded-tl-none border border-white/10">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white/5 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-brand-accent/50 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 gold-gradient rounded-xl flex items-center justify-center text-black hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center text-black shadow-2xl gold-glow relative"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-brand-bg">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-brand-bg min-h-screen selection:bg-brand-accent selection:text-black">
      <CodeBackground />
      <FloatingTech />
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Achievements />
      <Experience />
      <Contact />
      
      <footer className="py-12 border-t border-white/5 text-center text-white/10 text-[10px] font-mono tracking-[0.5em] uppercase">
        © 2026 Jesse Amukowa - All rights reserved
      </footer>
      <ChatAssistant />
    </div>
  );
}
