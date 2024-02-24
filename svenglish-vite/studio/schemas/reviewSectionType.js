import {defineField, defineType} from 'sanity'

const reviewType = defineType({
  name: 'reviewType',
  title: 'Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'reviewTitle',
      type: 'string',
      title: 'Review Title',
    }),
    defineField({
      name: 'reviewContent',
      title: 'Review Content',
      type: 'localeContent',
    }),
  ],
  preview: {
    select: {
      title: 'reviewTitle',
    },
  },
})

export default reviewType
