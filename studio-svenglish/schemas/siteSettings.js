export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site Title',
      description: 'The title of the site, usually displayed in the browser tab',
    },
    {
      name: 'logotypeDark',
      type: 'image',
      title: 'Logotype dark',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'logotypeWhite',
      type: 'image',
      title: 'Logotype white',
      options: {
        hotspot: true,
      },
    },
  ],
}
