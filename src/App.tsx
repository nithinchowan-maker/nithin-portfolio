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
  MessageSquare,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
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
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X /> : <Menu />}
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
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium"
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
  const roles = ["Frontend Developer", "Web Designer", "JavaScript Developer"];
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
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-600 font-mono font-medium tracking-widest uppercase mb-4 block">Welcome to my space</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6">
            Hi, I'm <span className="text-blue-600">Nithin</span>
          </h1>
          <div className="h-12 md:h-16 flex items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-medium text-slate-500 dark:text-slate-400">
              I am a <span className="text-slate-900 dark:text-white font-bold typing-cursor">{displayText}</span>
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-6 mb-10 leading-relaxed">
            Crafting beautiful, high-performance web experiences with modern technologies. 
            Focused on building clean, accessible, and user-centric interfaces.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-xl shadow-blue-600/20"
            >
              View Projects
            </a>
            <a 
              href="#contact"
              className="border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 px-8 py-3 rounded-full font-medium transition-all"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const skills = [
    "TypeScript", "React", "Node.js", "Tailwind CSS", 
    "Vite", "Express", "Framer Motion", "Git", "REST APIs", "UI/UX Design"
  ];

  return (
    <section id="about" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">About <span className="text-blue-600">Me</span></h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              I'm a passionate developer with a keen eye for design. My journey in web development started with a curiosity for how things work on the internet, and it has evolved into a career dedicated to creating impactful digital experiences.
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or learning about the latest advancements in web performance and accessibility.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            <h3 className="w-full text-sm font-mono uppercase tracking-widest text-slate-400 mb-2">My Skillset</h3>
            {skills.map((skill) => (
              <span 
                key={skill}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium shadow-sm"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "AI Canvas",
      description: "A collaborative drawing app powered by real-time WebSockets and Gemini AI for prompt-to-image generation.",
      tags: ["React", "Firebase", "WebSockets"],
      link: "#",
      github: "#"
    },
    {
      title: "FinanceFlow",
      description: "A minimal fintech dashboard for personal expense tracking with interactive D3.js visualizations.",
      tags: ["TypeScript", "D3.js", "Tailwind"],
      link: "#",
      github: "#"
    },
    {
      title: "ShopWave",
      description: "High-performance e-commerce storefront with server-side rendering and full-text search integration.",
      tags: ["Vite", "Node.js", "PostgreSQL"],
      link: "#",
      github: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured <span className="text-blue-600">Projects</span></h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">A selection of my best work, spanning from AI integrations to complex data visualizations.</p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group glass dark:bg-slate-800/50 p-6 rounded-2xl border-white/20 hover:border-blue-600/50 transition-all hover:-translate-y-2"
          >
            <div className="w-full aspect-video bg-slate-100 dark:bg-slate-700 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
              <Code className="w-12 h-12 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono uppercase bg-blue-600/10 text-blue-600 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href={project.github} className="text-slate-500 hover:text-black dark:hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href={project.link} className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
                Live Demo <ExternalLink className="w-3 h-3" />
              </a>
            </div>
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
    { icon: <Mail />, label: 'Email', href: '#' },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Get In <span className="text-blue-600">Touch</span></h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-lg mx-auto">
          Currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {social.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-4 glass rounded-2xl hover:bg-blue-600 hover:text-white transition-all group scale-100 hover:scale-105"
            >
              <span className="w-6 h-6">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="glass p-8 rounded-3xl max-w-lg mx-auto">
          <p className="font-mono text-sm uppercase tracking-widest text-slate-400 mb-4">Direct Message</p>
          <a href="mailto:hello@nithin.dev" className="text-2xl md:text-3xl font-display font-bold hover:text-blue-600 transition-colors">
            hello@nithin.dev
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-xl font-display font-bold tracking-tighter">
        NITHIN<span className="text-blue-600">.</span>
      </div>
      <p className="text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Nithin. Built with React & Tailwind.
      </p>
      <div className="flex items-center gap-6">
        <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Privacy</a>
        <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600/30">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />

      {/* Background Ornaments */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
