import { apiPlugin, storyblokInit } from '@storyblok/react/rsc'
import Page from '@/components/storyblok/Page'
import HeroSection from '@/components/storyblok/HeroSection'
import ProjectsGrid from '@/components/storyblok/ProjectsGrid'
import ContactSection from '@/components/storyblok/ContactSection'

export const getStoryblokApi = storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    apiOptions: {
        region: 'eu'
    },
    components: {
      page: Page,
      HeroSection,
      ProjectsGrid,
      ContactSection
    }
})
