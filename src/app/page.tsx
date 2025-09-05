import { getStoryblokApi } from '@/lib/storyblok'
import Wrapper from '@/components/Wrapper'
import type { ISbStoriesParams } from '@storyblok/react'

export default async function Home() {
  const { data } = await fetchData()

  return <Wrapper story={data.story} />
}

async function fetchData() {
  const storyblokApi = getStoryblokApi()
  return await storyblokApi.get('cdn/stories/home', {
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION || 'draft'
  } as ISbStoriesParams)
}
