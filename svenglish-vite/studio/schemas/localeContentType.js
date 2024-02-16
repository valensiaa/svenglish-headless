import {supportedLanguages} from './supportedLanguages.js'
import {defineType} from 'sanity'

const localeContent = defineType({
  title: 'Localized content',
  name: 'localeContent',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true},
    },
  ],
  // Dynamically define one field per language
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'array',
    of: [{type: 'block'}],
    fieldset: lang.isDefault ? null : 'translations',
  })),
})

export default localeContent
