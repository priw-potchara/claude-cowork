import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'coffee-shop',
  title: 'Coffee Shop CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Content')
              .child(
                S.list()
                  .title('Content')
                  .items([
                    S.listItem()
                      .title('Hero Section')
                      .child(
                        S.document()
                          .schemaType('hero')
                          .documentId('hero')
                      ),
                    S.listItem()
                      .title('About Section')
                      .child(
                        S.document()
                          .schemaType('about')
                          .documentId('about')
                      ),
                    S.listItem()
                      .title('Promotions')
                      .child(S.documentTypeList('promotion').title('Promotions')),
                    S.listItem()
                      .title('Testimonials')
                      .child(S.documentTypeList('testimonial').title('Testimonials')),
                  ])
              ),
            S.listItem()
              .title('Menu')
              .child(
                S.list()
                  .title('Menu')
                  .items([
                    S.listItem()
                      .title('All Items')
                      .child(S.documentTypeList('menuItem').title('All Menu Items')),
                    S.listItem()
                      .title('Drinks')
                      .child(
                        S.documentTypeList('menuItem')
                          .title('Drinks')
                          .filter('_type == "menuItem" && category == "drinks"')
                      ),
                    S.listItem()
                      .title('Food')
                      .child(
                        S.documentTypeList('menuItem')
                          .title('Food')
                          .filter('_type == "menuItem" && category == "food"')
                      ),
                    S.listItem()
                      .title('Seasonal')
                      .child(
                        S.documentTypeList('menuItem')
                          .title('Seasonal')
                          .filter('_type == "menuItem" && category == "seasonal"')
                      ),
                  ])
              ),
            S.listItem()
              .title('Gallery')
              .child(
                S.document()
                  .schemaType('gallery')
                  .documentId('gallery')
              ),
            S.listItem()
              .title('Hours')
              .child(
                S.document()
                  .schemaType('hours')
                  .documentId('hours')
              ),
            S.listItem()
              .title('Settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
