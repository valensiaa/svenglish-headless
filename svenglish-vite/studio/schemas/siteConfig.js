import baseLanguage from './baseLanguage'

import {defineType, defineField} from 'sanity'

const siteConfig = defineType({
  name: 'siteConfig',
  type: 'document',
  title: 'Site Settings',
  fieldsets: [
    {
      name: 'resourcesData',
      title: 'Resources section data',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: 'productsData',
      title: 'Products section data',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: 'aboutData',
      title: 'About section data',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: 'brandsData',
      title: 'Brands section data',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
      },
    },
    {
      name: 'reviewsData',
      title: 'Reviews section data',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Site Title',
      description: 'The title of the site, usually displayed in the browser tab',
    }),
    defineField({
      name: 'logotypeDark',
      type: 'image',
      title: 'Logotype dark',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logotypeWhite',
      type: 'image',
      title: 'Logotype white',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socIcons',
      type: 'reference',
      to: [{type: 'socIcons'}],
    }),

    defineField({
      name: 'titleProducts',
      type: 'localeString',
      title: 'Products section title',
      description: 'The title of the section. Optional',
      fieldset: 'productsData',
    }),
    defineField({
      name: 'anchorProducts',
      title: 'Unique name for linking to this section.',
      type: 'localeString',
      fieldset: 'productsData',
    }),

    defineField({
      name: 'iconProducts',
      type: 'image',
      title: 'Icon for products section',
      fieldset: 'productsData',
    }),

    defineField({
      name: 'titleRecources',
      type: 'localeString',
      title: 'Recources section title',
      description: 'The title of the section. Optional',
      fieldset: 'resourcesData',
    }),
    defineField({
      name: 'anchorRecources',
      title: 'Unique name for linking to this section.',
      type: 'localeString',
      fieldset: 'resourcesData',
    }),
    defineField({
      name: 'iconRecources',
      type: 'image',
      title: 'Icon for recources section',
      fieldset: 'resourcesData',
    }),

    defineField({
      name: 'titleBrands',
      type: 'localeString',
      title: 'Brands section title',
      description: 'The title of the section. Optional',
      fieldset: 'brandsData',
    }),
    defineField({
      name: 'anchorBrands',
      title: 'Unique name for linking to this section.',
      type: 'localeString',
      fieldset: 'brandsData',
    }),
    defineField({
      name: 'iconBrands',
      type: 'image',
      title: 'Icon for brands section',
      fieldset: 'brandsData',
    }),

    defineField({
      name: 'titleReviews',
      type: 'localeString',
      title: 'Reviews section title',
      description: 'The title of the section. Optional',
      fieldset: 'reviewsData',
    }),
    defineField({
      name: 'anchorReviews',
      title: 'Unique name for linking to this section.',
      type: 'localeString',
      fieldset: 'reviewsData',
    }),
    defineField({
      name: 'iconReviews',
      type: 'image',
      title: 'Icon for reviews section',
      fieldset: 'reviewsData',
    }),

    defineField({
      name: 'titleAbout',
      type: 'localeString',
      title: 'About section title',
      description: 'The title of the section. Optional',
      fieldset: 'aboutData',
    }),
    defineField({
      name: 'anchorAbout',
      title: 'Unique name for linking to this section.',
      type: 'localeString',
      fieldset: 'aboutData',
    }),
    defineField({
      name: 'iconAbout',
      type: 'image',
      title: 'Icon for about section',
      fieldset: 'aboutData',
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
  },
})

export default siteConfig
