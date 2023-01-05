import SanityClientConstructor from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = SanityClientConstructor({
  projectId: '7u37j3jy',
  dataset: 'production',
  useCdn: true,
  apiVersion: 'v2021-10-21',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

export default client
