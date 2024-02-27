import {supportedLanguages} from './supportedLanguages.js'
import {defineType} from 'sanity'

const localeUrl = defineType({
  title: 'Localized link',
  name: 'localeUrl',
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
    type: 'url',
    fieldset: lang.isDefault ? null : 'translations',
  })),
})

export default localeUrl
