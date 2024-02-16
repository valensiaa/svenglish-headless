import baseLanguage from './baseLanguage'

import {defineType, defineField} from 'sanity'

const siteConfig = defineType({
  name: 'siteConfig',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Site Title',
      description: 'The title of the site, usually displayed in the browser tab',
    }),
    defineField({
      name: 'logotypeDark',
      type: 'image',
      title: 'Logotype dark',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logotypeWhite',
      type: 'image',
      title: 'Logotype white',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
  },
})

export default siteConfig
