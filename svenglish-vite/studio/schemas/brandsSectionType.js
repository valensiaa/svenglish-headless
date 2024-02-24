import {defineType, defineField} from 'sanity'

const aboutSectionType = defineType({
  name: 'brandsSection',
  title: 'Brands section',
  type: 'document',
  fields: [
    defineField({
      name: 'brandsTitle',
      title: 'Title of section',
      type: 'string',
    }),
    defineField({
      name: 'arrayOfImages',
      title: 'Array of images',
      type: 'array',
      of: [{type: 'image'}],
    }),
  ],
  preview: {
    select: {
      title: 'brandsTitle',
    },
  },
})

export default aboutSectionType
