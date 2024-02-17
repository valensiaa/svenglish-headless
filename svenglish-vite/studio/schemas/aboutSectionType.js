import {defineField, defineType} from 'sanity'

const aboutSectionType = defineType({
  name: 'aboutSection',
  title: 'About section',
  type: 'document',
  fields: [
    defineField({
      name: 'anchor',
      title: 'Unique name for linking to this section. Must be unique on the page.',
      type: 'localeString',
    }),
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
