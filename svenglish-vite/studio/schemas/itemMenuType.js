import baseLanguage from './baseLanguage'

import {defineField, defineType} from 'sanity'

const itemMenuType = defineType({
  name: 'itemMenu',
  title: 'Main Menu Items',
  type: 'document',
  fields: [
    defineField({
      name: 'itemTitle',
      type: 'localeString',
      title: 'Item Title',
    }),
    defineField({
      name: 'itemAnchorURL',
      type: 'localeString',
      title: 'Anchor URL',
      description:
        'Add the anchor name for the URL which links to the section on the page. Example: #about',
    }),
  ],
  preview: {
    select: {
      title: `itemTitle.${baseLanguage.id}`,
    },
  },
})

export default itemMenuType
