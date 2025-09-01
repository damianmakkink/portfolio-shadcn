"use client"

import { useState } from 'react'
import { motion, stagger } from 'motion/react'
import { storyblokEditable } from '@storyblok/react/rsc'
import {
  BookOpenText,
  Bot,
  Building,
  FileText,
  FlaskConical,
  Globe,
  Users
} from 'lucide-react'
import { ProjectCard } from '../projects/ProjectCard'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import type { ProjectsGridStoryblok } from '@/types/component-types-sb'

export default function ProjectsGrid({blok}: {blok: ProjectsGridStoryblok}) {
  const [activeCategory, setActiveCategory] = useState('ALL')

  const categories = [
    { name: "ALL", icon: Globe },
    { name: "R&D", icon: FlaskConical },
    { name: "GenAI", icon: Bot },
    { name: "Docu", icon: FileText },
    { name: "Narrative", icon: BookOpenText },
    { name: "Commercial", icon: Building },
    { name: "Social", icon: Users }
  ]

  const filteredProjects =
    activeCategory === 'ALL'
    ? blok.projects
    : blok.projects?.filter(project => project.tags?.some(tag => tag === activeCategory))

  const tagParentVariant = {
    show: {
      transition: {
        delayChildren: stagger(0.05)
      }
    }
  }

  const tagChildVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section
      id="projects"
      className="py-24 bg-card/50"
      {...storyblokEditable(blok)}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, transform: 'translateY(-20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0)' }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-center"
        >
          Projects
        </motion.h2>

        <motion.div
          variants={tagParentVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12 justify-center"
        >
          {categories.map(category => (
            <motion.div
              key={category.name}
              variants={tagChildVariant}
            >
              <button
                className={`flex items-center gap-2 cursor-pointer px-4 py-2 uppercase text-xs tracking-widest border-b-2 transition-colors hover:text-white ${
                  activeCategory === category.name
                    ? "border-white text-white"
                    : "border-transparent text-muted-foreground"
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                <category.icon size={14} />
                {category.name}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects && filteredProjects.length === 0 &&
          <p className="text-muted-foreground text-center w-full">
            No projects with this tag.
          </p>
        }

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects && filteredProjects.map((project, index) => (
            <motion.div
              key={project._uid}
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0)' }}
              transition={{ delay: (index / 20) }}
              viewport={{ once: true }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full text-left p-0 bg-transparent border-0 cursor-pointer"
                  >
                    <ProjectCard
                      project={{
                        ...project,
                        cover: project.cover.filename,
                        durationSec: project.duration_in_seconds
                      }}
                    />
                  </button>
                </DialogTrigger>

                  <DialogContent
                    aria-describedby={`project-description-${project._uid}`}
                    className='!max-w-7xl'
                  >
                  <DialogHeader>
                    <DialogTitle>
                      {project.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${project.video_id}?autoplay=1`}
                      title={project.title}
                      className="w-full h-full rounded-t-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <DialogDescription className="text-muted-foreground">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags?.map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <table className="mt-4">
                      <tbody>
                        <tr className="h-4">
                          <td className="text-muted-foreground pr-4 py-1">
                            Studio
                          </td>
                          <td className="text-white py-1">
                            {project.studio}
                          </td>
                        </tr>
                        <tr className="h-4">
                          <td className="text-muted-foreground pr-4 py-1">
                            Client
                          </td>
                          <td className="text-white py-1">
                            {project.client}
                          </td>
                        </tr>
                        <tr className="h-4">
                          <td className="text-muted-foreground pr-4 py-1">
                            Platform
                          </td>
                          <td className="text-white py-1">
                            {project.platform}
                          </td>
                        </tr>
                        <tr className="h-4">
                          <td className="text-muted-foreground pr-4 py-1">
                            Role
                          </td>
                          <td className="text-white py-1">
                            {project.role?.join(', ')}
                          </td>
                        </tr>
                        <tr className="h-4">
                          <td className="text-muted-foreground pr-4 py-1">
                            Year
                          </td>
                          <td className="text-white py-1">
                            {project.year}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
