import { apiPlugin, storyblokInit } from '@storyblok/react/rsc'
import Page from '@/components/storyblok/Page'
import ProjectsGrid from '@/components/storyblok/ProjectsGrid'
import AboutSection from '@/components/storyblok/AboutSection'
import ServicesGrid from '@/components/storyblok/ServicesGrid'
import ContactSection from '@/components/storyblok/ContactSection'
import HeroHeader from '@/components/storyblok/HeroHeader'
import HeroSection from '@/components/storyblok/HeroSection'

export const getStoryblokApi = storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    apiOptions: {
        region: 'eu'
    },
    components: {
      page: Page,
      ProjectsGrid,
      AboutSection,
      ServicesGrid,
      ContactSection,
      HeroHeader,
      HeroSection
    }
})
