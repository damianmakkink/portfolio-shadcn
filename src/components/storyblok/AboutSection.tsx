"use client"

import { storyblokEditable, renderRichText } from '@storyblok/react/rsc'
import { motion } from 'motion/react'
import Icon from '@/components/icon/Icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { AboutSectionStoryblok } from '@/types/component-types-sb'

export default function AboutSection({blok}: {blok: AboutSectionStoryblok}) {
  return (
    <section
      id="about"
      className="py-24 bg-card/50"
      {...storyblokEditable(blok)}
    >
      <div className="max-w-4xl px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, transform: 'translateY(-20px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0)' }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6"
            >
              {blok.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0)' }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="prose text-muted-foreground leading-relaxed mb-6"
                dangerouslySetInnerHTML={{__html: renderRichText(blok.description)}}
              />
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {blok.skills?.map((skill, index) => (
                <motion.div
                  key={skill._uid}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: (index / 10) + 0.3 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    {skill.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {blok.usp_items?.map((usp, index) => (
              <motion.div
                key={usp._uid}
                initial={{ opacity: 0, transform: 'scale(.9)' }}
                whileInView={{ opacity: 1, transform: 'scale(1)' }}
                transition={{ delay: (index / 10) + 0.3 }}
                viewport={{ once: true }}
              >
                <Card
                  className="p-6 text-center hover:bg-card/80 transition-colors"
                >
                  <Icon
                    name={usp.icon}
                    className="w-8 h-8 mx-auto text-primary"
                  />
                  <h3 className="text-2xl font-bold">
                    {usp.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {usp.subtitle}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
