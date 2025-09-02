/* eslint-disable @next/next/no-async-client-component */

import { getStoryblokApi } from '@/lib/storyblok'
import Wrapper from '@/components/Wrapper'

export default async function Home() {
  const { data } = await fetchData()

  return <Wrapper story={data.story} />
}

async function fetchData() {
  const storyblokApi = getStoryblokApi()
  return await storyblokApi.get('cdn/stories/home', {
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION || 'draft'
  })
}
