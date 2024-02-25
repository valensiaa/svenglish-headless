import {defineField, defineType} from 'sanity'

const videoType = defineType({
  name: 'videoType',
  title: 'Videos',
  type: 'document',
  fields: [
    defineField({
      name: 'videoTitle',
      type: 'string',
      title: 'Video title',
    }),
    defineField({
      name: 'videoLink',
      type: 'string',
      title: 'Video link',
      description: 'Please insert the video link (shorts recommended) from Youtube',
    }),
  ],
  preview: {
    select: {
      title: 'videoTitle',
    },
  },
})

export default videoType
