"use client"

import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import type { HeroHeaderStoryblok } from '@/types/component-types-sb'

export default function HeroHeader({blok}: {blok: HeroHeaderStoryblok}) {
  return (
    <section
      id="header"
      className="py-24 md:py-32"
      {...storyblokEditable(blok)}
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <motion.h2
              initial={{ opacity: 0, transform: 'translateY(-20px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0)' }}
              viewport={{ once: true }}
              className="mx-auto max-w-5xl text-center text-3xl font-medium text-balance md:text-6xl"
            >
              {blok.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0)' }}
              transition={{ delay: .1 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg"
            >
              {blok.subtitle}
            </motion.p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <motion.div
                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0)' }}
                transition={{ delay: .2 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                >
                  <a href={blok.button_url}>
                    {blok.button_label}
                  </a>
                </Button>
              </motion.div>
              {blok.trusted_by && (
                <motion.div
                  initial={{ opacity: 0, transform: 'translateY(20px)' }}
                  whileInView={{ opacity: 1, transform: 'translateY(0)' }}
                  transition={{ delay: .3 }}
                  viewport={{ once: true }}
                  className="text-xs text-muted-foreground"
                >
                  {blok.trusted_by}
                </motion.div>
              )}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, transform: 'scale(0.95)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            transition={{ delay: .4, duration: .3 }}
          >
            <Image
              src={blok.image.filename || 'images/reel-cover.svg'}
              alt={blok.image.alt || blok.title}
              width={1280}
              height={720}
              className="mx-auto h-full w-full max-w-5xl rounded-2xl aspect-video object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
