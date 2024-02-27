import baseLanguage from './baseLanguage'

import {defineField, defineType} from 'sanity'

const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localeContent',
    }),
    defineField({
      name: 'cta',
      title: 'Call to action name',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to action link (URL)',
      type: 'localeUrl',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
  },
})

export default heroSectionType
