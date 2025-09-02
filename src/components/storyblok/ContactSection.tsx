"use client"

import { storyblokEditable } from '@storyblok/react/rsc'
import { motion, stagger } from 'motion/react'
import Icon from '@/components/icon/Icon'
import { Card } from '@/components/ui/card'
import type { ContactSectionStoryblok } from '@/types/component-types-sb'

export default function ContactSection({blok}: {blok: ContactSectionStoryblok}) {
  const parentVariant = {
    show: {
      transition: {
        delayChildren: stagger(0.05)
      }
    }
  }

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section
      id="contact"
      className="py-12 md:py-24"
      {...storyblokEditable(blok)}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, transform: 'translateY(-20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0)' }}
          viewport={{ once: true }}
          className="text-3xl font-mono font-bold mb-4"
        >
          {blok.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0)' }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted-foreground mb-8"
        >
          {blok.subtitle}
        </motion.p>

        <motion.div
          variants={parentVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {blok.items?.map(item => (
            <motion.a
              key={item._uid}
              href={item.url}
              target="_blank"
              variants={childVariant}
            >
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent hover:bg-primary/10 transition-colors group">
                <Icon
                  name={item.icon}
                  className="w-8 h-8 mb-4 mx-auto text-primary transition-colors group-hover:text-accent"
                />
                <h3 className="font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.subtitle}
                </p>
              </Card>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
