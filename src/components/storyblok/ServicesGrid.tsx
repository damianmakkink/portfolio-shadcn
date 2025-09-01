"use client"

import { storyblokEditable } from '@storyblok/react/rsc'
import { motion } from 'motion/react'
import Icon from '@/components/icon/Icon'
import { Card } from '@/components/ui/card'
import type { ServicesGridStoryblok } from '@/types/component-types-sb'

export default function ServicesGrid({blok}: {blok: ServicesGridStoryblok}) {
  return (
    <section
      id="services"
      className="py-24"
      {...storyblokEditable(blok)}
    >
      <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, transform: 'translateY(-20px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0)' }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              {blok.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0)' }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              {blok.subtitle}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blok.services?.map((service, index) => (
              <motion.div
                key={service._uid}
                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0)' }}
                transition={{ delay: (index / 10) + 0.3 }}
                viewport={{ once: true }}
              >
                <Card
                  className="h-full p-8 transition-all duration-300 hover:bg-card/80 hover:scale-[1.02] group will-change-transform"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon
                      name={service.icon}
                      className={`w-6 h-6 ${index % 2 === 0 ? 'text-primary' : 'text-accent'}`}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  )
}
