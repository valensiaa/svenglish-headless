import {defineField, defineType} from 'sanity'

const productType = defineType({
  name: 'productType',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'productTitle',
      type: 'localeString',
      title: 'Product Title',
    }),
    defineField({
      title: 'Product Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: `productTitle.fr`,
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    }),
    defineField({
      title: 'Product Slug (en)',
      name: 'slugEn',
      type: 'slug',
      options: {
        source: `productTitle.en`,
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    }),
    defineField({
      name: 'productSubTitle',
      type: 'localeString',
      title: 'Product Subtitle',
    }),
    defineField({
      name: 'productContent',
      title: 'Product Excerpt',
      type: 'localeContent',
    }),
    defineField({
      name: 'productContentDetails',
      title: 'Product Content',
      type: 'localeContent',
    }),
    defineField({
      name: 'productIcon',
      title: 'Product Icon',
      type: 'image',
    }),
    defineField({
      name: 'productHeroImage',
      title: 'Hero image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'productTitle.en',
    },
  },
})

export default productType
