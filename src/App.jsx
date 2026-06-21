import { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Environment, Stars, Text3D, Center } from '@react-three/drei'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'

const HeroScene = () => {
  const meshRef = useRef()
  const { viewport } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#ec4899" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[2, 0, 0]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere args={[0.8, 32, 32]} position={[-2.5, 1.5, -1]}>
          <MeshDistortMaterial
            color="#a855f7"
            attach="material"
            distort={0.3}
            speed={3}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <Sphere args={[0.5, 32, 32]} position={[-1.5, -1.5, 1]}>
          <MeshDistortMaterial
            color="#ec4899"
            attach="material"
            distort={0.2}
            speed={2.5}
            roughness={0.15}
            metalness={0.85}
          />
        </Sphere>
      </Float>

      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />
    </>
  )
}

const ProjectsScene = () => {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const projects = [
    { position: [-3, 0, 0], color: '#6366f1' },
    { position: [0, 0, -2], color: '#a855f7' },
    { position: [3, 0, 0], color: '#ec4899' },
  ]

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#6366f1" />
      
      {projects.map((p, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={p.position}>
            <boxGeometry args={[1.8, 1.2, 0.1]} />
            <meshStandardMaterial 
              color={p.color} 
              metalness={0.7} 
              roughness={0.3}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: 'easeInOut' }}
  >
    <div className="text-center">
      <motion.div
        className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full mx-auto mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.p
        className="text-xl text-gray-400 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading Experience...
      </motion.p>
    </div>
  </motion.div>
)

const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = ['Home', 'About', 'Projects', 'Skills', 'Contact']

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#home"
          className="text-2xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          PaongLabs
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-sm font-medium transition-colors duration-300 ${
                activeSection === link.toLowerCase()
                  ? 'text-indigo-400'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ y: -2 }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="#contact"
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-sm font-medium text-white"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Talk
        </motion.a>
      </div>
    </motion.nav>
  )
}

const Section = ({ children, className = '', id }) => (
  <section id={id} className={`relative min-h-screen py-24 ${className}`}>
    {children}
  </section>
)

const Hero = () => (
  <Section id="home" className="flex items-center">
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>

    <div className="max-w-7xl mx-auto px-6 w-full pt-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="text-indigo-400 font-mono text-sm mb-4 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            AI AGENT DEVELOPER
          </motion.p>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Building the{' '}
            <span className="gradient-text">Future</span>
            <br />
            with <span className="gradient-text">AI</span>
          </motion.h1>

          <motion.p
            className="text-gray-400 text-lg mb-8 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Crafting intelligent systems, autonomous agents, and cutting-edge 
            AI solutions that push the boundaries of what's possible.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-medium text-white"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 glass rounded-full font-medium text-white border border-white/10"
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
        </motion.div>
      </div>
    </div>
  </Section>
)

const About = () => {
  const stats = [
    { number: '50+', label: 'AI Projects' },
    { number: '30+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '24/7', label: 'Available' },
  ]

  return (
    <Section id="about" className="mesh-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-indigo-400 font-mono text-sm mb-4 tracking-wider">ABOUT ME</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Passionate about <span className="gradient-text">AI Innovation</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I'm an AI Agent Developer at PaongLabs, specializing in building intelligent 
              systems that automate complex workflows and create seamless user experiences.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              From developing autonomous trading bots to creating advanced AI agents, 
              I bring ideas to life with cutting-edge technology. My passion lies in 
              pushing the boundaries of what AI can achieve.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When I'm not coding, you'll find me exploring new AI frameworks, 
              contributing to open-source projects, and sharing knowledge with the 
              developer community.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Python', 'TypeScript', 'React', 'Node.js', 'AI/ML', 'Automation'].map((tag) => (
                <span key={tag} className="px-4 py-2 glass rounded-full text-sm text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(99, 102, 241, 0.3)' }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

const Projects = () => {
  const projects = [
    {
      title: 'AI Trading Bot',
      description: 'Autonomous trading system using machine learning for market prediction and execution.',
      tags: ['Python', 'TensorFlow', 'API'],
      color: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Smart Assistant Agent',
      description: 'Intelligent AI agent that automates daily tasks with natural language understanding.',
      tags: ['OpenAI', 'LangChain', 'React'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Data Analytics Platform',
      description: 'Real-time analytics dashboard with AI-powered insights and predictions.',
      tags: ['Next.js', 'Python', 'ML'],
      color: 'from-pink-500 to-rose-500',
    },
  ]

  return (
    <Section id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-indigo-400 font-mono text-sm mb-4 tracking-wider">FEATURED WORK</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Selected <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group glass rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 border-2 border-white/30 rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

const Skills = () => {
  const skills = [
    { name: 'AI/ML', level: 95, icon: '🤖' },
    { name: 'Python', level: 90, icon: '🐍' },
    { name: 'TypeScript', level: 85, icon: '📘' },
    { name: 'React/Next.js', level: 88, icon: '⚛️' },
    { name: 'Automation', level: 92, icon: '⚡' },
    { name: 'API Design', level: 87, icon: '🔌' },
  ]

  return (
    <Section id="skills" className="mesh-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-indigo-400 font-mono text-sm mb-4 tracking-wider">EXPERTISE</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{skill.icon}</span>
                <span className="font-medium">{skill.name}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                />
              </div>
              <div className="text-right text-sm text-gray-400 mt-2">{skill.level}%</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

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
    <Section id="contact">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-indigo-400 font-mono text-sm mb-4 tracking-wider">GET IN TOUCH</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Let's <span className="gradient-text">Collaborate</span>
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Message</label>
            <textarea
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
              placeholder="Tell me about your project..."
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium text-white"
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            {submitted ? 'Message Sent!' : 'Send Message'}
          </motion.button>
        </motion.form>
      </div>
    </Section>
  )
}

const Footer = () => (
  <footer className="py-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-2xl font-bold gradient-text">PaongLabs</div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/paong" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://t.me/paonglabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            Telegram
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          Crafted with AI by PaongLabs
        </p>
      </div>
    </div>
  </footer>
)

function App() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact']
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

    window.addEventListener('scroll', handleScroll)
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
          transition={{ duration: 0.5 }}
        >
          <Navbar activeSection={activeSection} />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default App