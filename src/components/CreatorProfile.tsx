/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Rocket,
  Code2,
  Globe2,
  Brain,
  Star,
  Award,
  Cpu,
  Network,
  Radio,
  Workflow,
  Binary,
  Terminal,
} from "lucide-react";
import { SpinningMolecule } from "./SpinningMolecule";
import SciFiPortal from "./SciFiPortal";

export function CreatorProfile() {
  const [selectedSection, setSelectedSection] = useState<string>("experience");

  const sections = {
    experience: {
      title: "Multiversal Experience",
      icon: <Rocket className="h-6 w-6" />,
      content: [
        {
          title: "Interdimensional Web Developer",
          period: "2020 - Present",
          description:
            "Crafting digital realities across multiple universes, specializing in quantum-powered web experiences.",
          technologies: ["React", "Next.js", "TypeScript", "Node.js"],
        },
        {
          title: "Cosmic Frontend Explorer",
          period: "2018 - 2020",
          description:
            "Pioneered breakthrough UI patterns in the outer reaches of the digital cosmos.",
          technologies: ["Vue.js", "Nuxt.js", "TailwindCSS"],
        },
      ],
    },
    skills: {
      title: "Dimensional Powers",
      icon: <Brain className="h-6 w-6" />,
      content: [
        {
          category: "Reality Manipulation (Frontend)",
          items: ["React", "Next.js", "TypeScript", "TailwindCSS"],
          icon: <Terminal className="h-5 w-5" />,
        },
        {
          category: "Quantum Systems (Backend)",
          items: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
          icon: <Cpu className="h-5 w-5" />,
        },
        {
          category: "Cosmic Tools",
          items: ["Git", "Docker", "AWS", "Vercel"],
          icon: <Workflow className="h-5 w-5" />,
        },
      ],
    },
    projects: {
      title: "Multiversal Creations",
      icon: <Star className="h-6 w-6" />,
      content: [
        {
          title: "Dimensional Portfolio Engine",
          description:
            "A reality-bending portfolio generator that exists simultaneously across multiple universes.",
          technologies: ["Next.js", "Three.js", "Framer Motion"],
        },
        {
          title: "Quantum Chat Nexus",
          description:
            "Communication platform that transcends space, time, and dimensional boundaries.",
          technologies: ["React", "Socket.io", "Node.js"],
        },
      ],
    },
  };

  return (
    <div className="relative z-10 mx-auto max-w-6xl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-12 text-center"
      >
        <div className="mb-8 flex justify-center gap-8">
          <SpinningMolecule />
          <motion.div
            className="relative h-32 w-32"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <img
              src="/placeholder.svg?height=150&width=150"
              alt="Creator Avatar"
              className="h-32 w-32 rounded-full border-2 border-cyan-500/50"
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34,211,238,0.2)",
                  "0 0 40px rgba(34,211,238,0.4)",
                  "0 0 20px rgba(34,211,238,0.2)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <SpinningMolecule />
        </div>
        <h1 className="mb-2 text-4xl font-bold text-cyan-300">
          Multiversal Developer
        </h1>
        <p className="mb-4 text-xl text-cyan-100">
          Weaving Digital Dreams Across Dimensions
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="bg-cyan-950/50 text-cyan-300">
            <Globe2 className="mr-1 h-4 w-4" /> Earth-Prime Based
          </Badge>
          <Badge variant="outline" className="bg-purple-950/50 text-purple-300">
            <Code2 className="mr-1 h-4 w-4" /> Reality Engineer
          </Badge>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="mb-8 flex justify-center gap-4">
        {Object.entries(sections).map(([key, section]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedSection(key)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
              selectedSection === key
                ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-red-500/20 text-white"
                : "bg-gray-900/50 text-slate-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-red-500/10 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {section.icon}
            <span>{section.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Content Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-cyan-500/20 bg-gray-900/80">
            <CardContent className="p-6">
              {selectedSection === "experience" && (
                <div className="space-y-6">
                  {sections.experience.content.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="relative border-l-2 border-cyan-500/30 pl-8"
                    >
                      <SciFiPortal className="absolute left-0 top-0 h-8 w-8 -translate-x-[18px] -translate-y-2" />
                      <h3 className="mb-1 text-xl font-bold text-cyan-300">
                        {exp.title}
                      </h3>
                      <p className="mb-2 text-cyan-200/70">{exp.period}</p>
                      <p className="mb-3 text-slate-200">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="cursor-pointer bg-blue-950/30 text-white transition-colors hover:bg-purple-950/30"
                          >
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              whileTap={{ scale: 0.8 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Binary className="mr-1 h-3 w-3" />
                            </motion.div>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedSection === "skills" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {sections.skills.content.map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="rounded-lg border border-cyan-500/20 bg-gradient-to-br from-cyan-950/50 to-purple-950/50 p-4"
                    >
                      <motion.div
                        className="mb-3 flex cursor-pointer items-center gap-2"
                        whileHover={{
                          scale: 1.05,
                          filter: "brightness(1.2)",
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        animate={{
                          textShadow: [
                            "0 0 8px rgba(34,211,238,0.3)",
                            "0 0 16px rgba(34,211,238,0.6)",
                            "0 0 8px rgba(34,211,238,0.3)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <motion.div
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          {category.icon}
                        </motion.div>
                        <h3 className="text-lg font-semibold text-cyan-300">
                          {category.category}
                        </h3>
                      </motion.div>
                      <div className="space-y-2">
                        {category.items.map((item, i) => (
                          <motion.div
                            key={item}
                            className="flex cursor-pointer items-center gap-2 text-slate-200"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 + i * 0.1 }}
                            whileHover={{
                              x: 10,
                              textShadow: "0 0 8px rgba(34,211,238,0.6)",
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Network className="h-4 w-4 text-cyan-500" />
                            </motion.div>
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedSection === "projects" && (
                <div className="grid gap-6 md:grid-cols-2">
                  {sections.projects.content.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="relative overflow-hidden rounded-lg border border-cyan-500/20 bg-gradient-to-br from-blue-950/50 via-purple-950/50 to-red-950/50 p-6"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-cyan-500/5 to-purple-500/5"
                        animate={{
                          opacity: [0.3, 0.5, 0.3],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="relative flex items-start gap-4">
                        <div className="mt-1">
                          <motion.div
                            whileHover={{
                              rotate: 360,
                              scale: 1.2,
                            }}
                            whileTap={{
                              scale: 0.8,
                              rotate: -180,
                            }}
                            transition={{
                              duration: 0.3,
                            }}
                          >
                            <Award className="h-6 w-6 text-cyan-500" />
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="mb-2 text-xl font-bold text-cyan-300">
                            {project.title}
                          </h3>
                          <p className="mb-4 text-slate-200">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="bg-purple-950/30 text-white"
                              >
                                <Radio className="mr-1 h-3 w-3" />
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      {/* Atmospheric Effects */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-gradient-radial absolute inset-0 from-red-500/5 via-transparent to-transparent"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
          />
        ))}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="bg-gradient-radial absolute inset-0 from-cyan-500/5 via-transparent to-transparent"
            animate={{
              scale: [1.1, 1.3, 1.1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
