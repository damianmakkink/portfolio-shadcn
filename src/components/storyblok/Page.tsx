import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc'
import type { PageStoryblok } from '@/types/component-types-sb'

export default function Page({blok}: {blok: PageStoryblok}) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  )
}
