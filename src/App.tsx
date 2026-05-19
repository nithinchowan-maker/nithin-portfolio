/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  User, 
  Briefcase, 
  Instagram,
  Phone,
  MessageSquare,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: <User className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <Code className="w-4 h-4" /> },
    { name: 'Projects', href: '#projects', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Contact', href: '#contact', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <motion.a 
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter"
        >
          NITHIN<span className="text-blue-600">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X className="text-slate-900" /> : <Menu className="text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-slate-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-lg font-bold text-slate-600"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const roles = ["Full Stack Developer", "Frontend Developer", "Web Designer", "JavaScript Developer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles, typingSpeed]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="max-w-4xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, z: -100, rotateX: 20 }}
          animate={{ opacity: 1, z: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          <span className="text-blue-600 font-mono font-medium tracking-widest uppercase mb-4 block">Welcome to my space</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[var(--foreground)] to-blue-600/50">
            Hi, I'm <span className="text-blue-600">Nithin</span>
          </h1>
          <div className="h-12 md:h-16 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-medium text-slate-500">
              I am a <span className="text-slate-900 font-bold typing-cursor">{displayText}</span>
            </h2>
          </div>
          <p className="text-lg text-slate-600 max-w-xl mx-auto mt-6 mb-10 leading-relaxed font-medium">
            Crafting full-stack digital experiences with a focus on 3D interaction, 
            performance, and clean architecture.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a 
              whileHover={{ scale: 1.05, translateZ: 20 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-blue-600/30"
            >
              View My Work
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, translateZ: 20 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="border border-slate-300 hover:bg-slate-100 px-8 py-4 rounded-full font-bold transition-all text-slate-900"
            >
              Let's Talk
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating 3D Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl -z-10"
      />
    </section>
  );
};

const About = () => {
  const skills = [
    "Full Stack", "TypeScript", "React", "Node.js", "Tailwind CSS", 
    "Vite", "Express", "Framer Motion", "MongoDB", "PostgreSQL", "UI/UX"
  ];

  return (
    <section id="about" className="py-32 px-6 bg-slate-100/50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-slate-950">About <span className="text-blue-600">Me</span></h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed font-medium">
              I am a specialized <span className="text-blue-600 font-bold">Full Stack Developer</span> with a passion for building complete, end-to-end applications. My expertise lies in bridging the gap between sophisticated design and robust backend infrastructure.
            </p>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed font-medium">
              Every project I undertake is built with scalability, performance, and user experience at its core. I thrive on solving complex technical challenges while maintaining a clean, intuitive interface.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 glass rounded-3xl shadow-2xl shadow-blue-600/5 border-slate-200"
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-6 font-extrabold">Expertise Matrix</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.span 
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}
                  key={skill}
                  className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-default text-slate-700"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "EduPath",
      description: "An adaptive learning platform featuring personalized curriculum paths and intelligent progress tracking for students.",
      tags: ["Full Stack", "LMS", "TypeScript"],
      link: "#",
      github: "#"
    },
    {
      title: "MedLink",
      description: "Secure healthcare communication portal bridging the gap between patients and practitioners with encrypted record management.",
      tags: ["Security", "React", "Node.js"],
      link: "#",
      github: "#"
    },
    {
      title: "MentorA",
      description: "AI-driven mentorship matching platform connecting industry experts with aspiring professionals through smart algorithms.",
      tags: ["AI/ML", "Matching", "Full Stack"],
      link: "#",
      github: "#"
    }
  ];

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-bold mb-6"
        >
          Selected <span className="text-blue-600">Work</span>
        </motion.h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">Exploring the intersection of data, design, and robust full-stack engineering.</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              whileHover={{ 
                rotateX: -10, 
                rotateY: 10,
                scale: 1.02,
                translateZ: 20
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group glass bg-white/60 p-8 rounded-[2rem] border-slate-200 hover:border-blue-600/30 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 h-full flex flex-col"
            >
              <div className="w-full aspect-square bg-slate-50 rounded-2xl mb-8 overflow-hidden flex items-center justify-center group-hover:bg-blue-600/5 transition-colors">
                <Code className="w-16 h-16 text-slate-300 group-hover:text-blue-600 transition-all group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors text-slate-900">
                {project.title}
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed flex-grow font-medium">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono font-extrabold uppercase bg-blue-600/10 text-blue-600 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto">
                <a href={project.github} className="p-3 bg-slate-100 rounded-full text-slate-500 hover:text-black hover:scale-110 transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <motion.a 
                  whileHover={{ x: 5 }}
                  href={project.link} 
                  className="flex items-center gap-2 text-sm font-bold text-blue-600 px-4 py-2 hover:bg-blue-600/5 rounded-full transition-all"
                >
                  Live Demo <ChevronRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const social = [
    { icon: <Github />, label: 'GitHub', href: '#' },
    { icon: <Linkedin />, label: 'LinkedIn', href: '#' },
    { icon: <Instagram />, label: 'Instagram', href: 'https://instagram.com/nithin._.chowhan07' },
    { icon: <Mail />, label: 'Email', href: 'mailto:nithinchowan8@gmail.com' },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-slate-100/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-950">Get In <span className="text-blue-600">Touch</span></h2>
        <p className="text-slate-600 mb-12 max-w-lg mx-auto font-medium">
          Currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {social.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 glass rounded-2xl hover:bg-blue-600 hover:text-white transition-all group scale-100 hover:scale-105 shadow-sm font-bold text-slate-700"
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="font-bold">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="glass p-8 rounded-3xl text-center shadow-sm">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-4 font-extrabold">Email Me</p>
            <a href="mailto:nithinchowan8@gmail.com" className="text-lg md:text-xl font-display font-bold hover:text-blue-600 transition-colors break-all text-slate-900">
              nithinchowan8@gmail.com
            </a>
          </div>
          <div className="glass p-8 rounded-3xl text-center shadow-sm">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-4 font-extrabold">Call Me</p>
            <a href="tel:8688726898" className="text-lg md:text-xl font-display font-bold hover:text-blue-600 transition-colors text-slate-900">
              +91 8688726898
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-6 border-t border-slate-200 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-xl font-display font-bold tracking-tighter text-slate-900">
        NITHIN<span className="text-blue-600">.</span>
      </div>
      <p className="text-slate-500 text-sm font-medium">
        &copy; {new Date().getFullYear()} Nithin. Built with React & Tailwind.
      </p>
      <div className="flex items-center gap-6">
        <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors font-medium">Privacy</a>
        <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors font-medium">Terms</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600/30">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />

      {/* Background Ornaments */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
