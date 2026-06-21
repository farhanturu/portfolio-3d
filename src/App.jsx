import { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Stars, Environment } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

const HeroScene = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#f97316" />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#06b6d4" />
      <spotLight position={[0, 10, 0]} angle={0.4} penumbra={1} intensity={0.6} color="#f43f5e" />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[2.5, 0, 0]}>
          <MeshDistortMaterial
            color="#f97316"
            attach="material"
            distort={0.35}
            speed={1.5}
            roughness={0.3}
            metalness={0.7}
          />
        </Sphere>
      </Float>

      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.6}>
        <Sphere args={[0.9, 32, 32]} position={[-2.8, 1.8, -1]}>
          <MeshDistortMaterial
            color="#06b6d4"
            attach="material"
            distort={0.25}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
        <Sphere args={[0.6, 32, 32]} position={[-1.8, -1.8, 0.5]}>
          <MeshDistortMaterial
            color="#f43f5e"
            attach="material"
            distort={0.2}
            speed={1.8}
            roughness={0.25}
            metalness={0.75}
          />
        </Sphere>
      </Float>

      <Stars radius={40} depth={40} count={2000} factor={3} saturation={0} fade speed={0.8} />
      <Environment preset="night" />
    </>
  )
}

const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0c10]"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: 'easeInOut' }}
  >
    <div className="text-center">
      <motion.div
        className="w-12 h-12 border-2 border-orange-500/20 border-t-orange-500 rounded-full mx-auto mb-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.p
        className="text-sm text-gray-500 font-mono tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Initializing
      </motion.p>
    </div>
  </motion.div>
)

const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Work', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled ? 'backdrop-blur-xl bg-[#0c0c10]/80 border-b border-white/5' : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <motion.a
          href="#home"
          className="text-lg font-semibold tracking-tight text-white"
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          farhan<span className="text-orange-500">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeSection === link.id
                  ? 'text-orange-400 bg-orange-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <motion.a
          href="https://github.com/farhanturu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 border border-white/10 rounded-lg hover:border-white/20 hover:text-white transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </motion.a>
      </div>
    </motion.nav>
  )
}

const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center">
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>

    <div className="absolute inset-0 -z-[5] bg-gradient-to-b from-transparent via-transparent to-[#0c0c10]" />

    <div className="max-w-6xl mx-auto px-6 w-full pt-20">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-orange-400 bg-orange-500/10 rounded-full mb-6 border border-orange-500/20">
            AI Agent Developer
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          I build things
          <br />
          that{' '}
          <span className="text-orange-500">think</span>
        </motion.h1>

        <motion.p
          className="text-gray-400 text-base sm:text-lg mb-10 max-w-lg leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          Developer focused on AI automation, intelligent agents, and tools that make complex workflows feel simple.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-xl text-sm"
            whileHover={{ scale: 1.03, backgroundColor: '#ea580c' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            See my work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-300 font-medium rounded-xl text-sm border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in touch
          </motion.a>
        </motion.div>
      </div>
    </div>

    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <motion.div
        className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-1 h-2 bg-white/40 rounded-full"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  </section>
)

const About = () => (
  <section id="about" className="py-32 relative">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-5 gap-16">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-sm font-medium tracking-wider uppercase text-gray-500 mb-4">About</h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Developer, builder,
            <br />
            <span className="text-orange-500">problem solver.</span>
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-3 space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p className="text-gray-300 text-base leading-relaxed">
            I'm Farhan, an AI agent developer building at the intersection of automation and intelligence. I create systems that don't just execute tasks, they understand context.
          </p>
          <p className="text-gray-400 text-base leading-relaxed">
            From autonomous trading bots to intelligent assistants, I've shipped tools that handle complexity so humans don't have to. My work spans Python, TypeScript, React, and whatever else gets the job done.
          </p>
          <p className="text-gray-400 text-base leading-relaxed">
            Currently focused on AI agent architectures, tool-use patterns, and making machine intelligence actually useful.
          </p>

          <div className="pt-4 flex flex-wrap gap-2">
            {['Python', 'TypeScript', 'React', 'Node.js', 'Go', 'AI/ML', 'Docker', 'PostgreSQL'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 text-xs font-medium text-gray-400 bg-white/5 rounded-lg border border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)

const projects = [
  {
    title: 'absensi-demo',
    description: 'Employee attendance system with full backend and interactive demo interface.',
    tags: ['Python', 'React', 'API'],
    link: 'https://github.com/farhanturu/absensi-demo',
    accent: 'bg-orange-500',
  },
  {
    title: 'termfolio',
    description: 'Terminal-based portfolio templates for developers who live in the CLI.',
    tags: ['TypeScript', 'Node.js', 'CLI'],
    link: 'https://github.com/farhanturu/termfolio',
    accent: 'bg-cyan-500',
  },
  {
    title: 'ai-skills-hub',
    description: 'Collection of 15+ AI agent skills for automation and productivity workflows.',
    tags: ['AI', 'Automation', 'Agents'],
    link: 'https://github.com/farhanturu/ai-skills-hub',
    accent: 'bg-rose-500',
  },
  {
    title: 'vibe-toolkit',
    description: 'Developer toolkit with 10+ utilities for modern web development.',
    tags: ['TypeScript', 'React', 'Tools'],
    link: 'https://github.com/farhanturu/vibe-toolkit',
    accent: 'bg-violet-500',
  },
]

const Projects = () => (
  <section id="projects" className="py-32 relative">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-sm font-medium tracking-wider uppercase text-gray-500 mb-4">Projects</h2>
        <p className="text-3xl sm:text-4xl font-bold tracking-tight">
          Things I've <span className="text-orange-500">built</span>
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-2 h-2 rounded-full ${project.accent}`} />
              <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">{project.title}</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-[11px] font-medium text-gray-500 bg-white/5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <a
          href="https://github.com/farhanturu?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-300"
        >
          View all repositories
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>
    </div>
  </section>
)

const skills = [
  { name: 'Python', level: 92 },
  { name: 'TypeScript', level: 88 },
  { name: 'React / Next.js', level: 85 },
  { name: 'Node.js', level: 82 },
  { name: 'Go', level: 70 },
  { name: 'AI / ML', level: 90 },
  { name: 'Docker', level: 80 },
  { name: 'PostgreSQL', level: 78 },
]

const Skills = () => (
  <section id="skills" className="py-32 relative">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-sm font-medium tracking-wider uppercase text-gray-500 mb-4">Skills</h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-6">
            Tech I work with
            <br />
            <span className="text-orange-500">daily.</span>
          </p>
          <p className="text-gray-400 text-base leading-relaxed max-w-md">
            Building AI agents requires a broad stack. Here's what I reach for most.
          </p>
        </motion.div>

        <div className="space-y-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                <span className="text-xs text-gray-600 font-mono">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-sm font-medium tracking-wider uppercase text-gray-500 mb-4">Contact</h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-6">
              Let's work
              <br />
              <span className="text-orange-500">together.</span>
            </p>
            <p className="text-gray-400 text-base leading-relaxed max-w-md mb-8">
              Got an AI project in mind? Need automation built? Or just want to chat about tech?
            </p>

            <div className="space-y-4">
              <a
                href="https://github.com/farhanturu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">GitHub</div>
                  <div className="text-xs text-gray-500">github.com/farhanturu</div>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:border-orange-500/50 focus:outline-none transition-all duration-300"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:border-orange-500/50 focus:outline-none transition-all duration-300"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Message</label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:border-orange-500/50 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-3.5 bg-orange-500 text-white font-medium rounded-xl text-sm hover:bg-orange-600 transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {submitted ? 'Sent!' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="py-8 border-t border-white/5">
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-gray-600">
        Built by Farhan at PaongLabs
      </p>
      <div className="flex items-center gap-4">
        <a href="https://github.com/farhanturu" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors duration-300">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
)

function App() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'skills', 'contact']
      const scrollPos = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const bottom = top + el.offsetHeight
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Navbar activeSection={activeSection} />
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default App