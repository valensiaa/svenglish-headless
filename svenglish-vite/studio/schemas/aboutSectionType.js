import {defineField, defineType} from 'sanity'

const aboutSectionType = defineType({
  name: 'aboutSection',
  title: 'About section',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localeContent',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'anchor.en',
    },
  },
})

export default aboutSectionType
