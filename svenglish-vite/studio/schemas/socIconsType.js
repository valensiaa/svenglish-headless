import {defineField, defineType} from 'sanity'

const socIconsType = {
  type: 'document',
  name: 'socIcons',
  fieldsets: [
    {
      name: 'social',
      title:
        'Social media handles. Add only the full URL. Leave the field empty if you wish hide icon.',
    },
  ],
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Sven tshirt shop',
      name: 'tshirtShop',
      type: 'string',
      fieldset: 'social',
    },
    {
      title: 'WhatsApp',
      name: 'whatsapp',
      type: 'string',
      fieldset: 'social',
    },
    {
      title: 'Instagram',
      name: 'instagram',
      type: 'string',
      fieldset: 'social',
    },
    {
      title: 'Facebook',
      name: 'facebook',
      type: 'string',
      fieldset: 'social',
    },
    {
      title: 'Youtube',
      name: 'youtube',
      type: 'string',
      fieldset: 'social',
    },
    {
      title: 'Gmail',
      name: 'gmail',
      type: 'string',
      fieldset: 'social',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}
export default socIconsType
