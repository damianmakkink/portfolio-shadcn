"use client"

import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'
import { motion, stagger } from 'motion/react'
import { Card } from '@/components/ui/card'
import Icon from '@/components/icon/Icon'
import type { HeroSectionStoryblok } from '@/types/component-types-sb'

export default function HeroSection({blok}: {blok: HeroSectionStoryblok}) {
  const parentVariant = {
    show: {
      transition: {
        delayChildren: stagger(0.1)
      }
    }
  }

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section {...storyblokEditable(blok)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <Image
          src={blok.video_cover.filename || 'images/reel-cover.svg'}
          alt={blok.video_cover.alt || blok.title}
          width={1280}
          height={720}
          className="mx-auto h-full w-full max-w-[1920px] rounded-2xl aspect-video object-cover"
        />
      </motion.div>
      <div className="max-w-7xl mx-auto">

        <div
          id="about"
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, transform: 'translateY(-20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0)' }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            {blok.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ delay: .1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {blok.description}
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          variants={parentVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {blok.expertises && blok.expertises.map((expertise) => (
            <motion.div
              key={expertise._uid}
              variants={childVariant}
            >
              <Card className="p-6 text-center hover:bg-card/80 transition-all duration-300 will-change-transform hover:scale-[1.02] group rounded-none">
                <Icon
                  name={expertise.icon}
                  className="w-8 h-8 mb-3 mx-auto text-primary group-hover:text-accent transition-colors duration-200"
                />
                <h3 className="font-semibold">
                  {expertise.label}
                </h3>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
