/* eslint-disable @next/next/no-async-client-component */

import { getStoryblokApi } from '@/lib/storyblok'
import { StoryblokStory } from '@storyblok/react/rsc'
import SideNav from '@/components/general/SideNav'
import Footer from '@/components/general/Footer'
import Navbar from '@/components/general/Navbar'

export default async function Home() {
  const { data } = await fetchData()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SideNav />
      <Navbar />
      <main className='md:ml-64 p-4 md:p-8'>
        <StoryblokStory story={data.story} />
        <Footer />
      </main>
    </main>
  )
}

async function fetchData() {
  const storyblokApi = getStoryblokApi()
  return await storyblokApi.get('cdn/stories/home', { version: 'draft' })
}
