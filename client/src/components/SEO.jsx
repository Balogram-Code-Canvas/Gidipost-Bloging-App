import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title, 
  description, 
  image, 
  url,
  type = 'website'
}) => {

  const defaultTitle = 'Gidipost: Tech Blog'
  const defaultDescription = 'Gidipost covers the latest in tech from programming and software development to AI, gadgets, news, and tech opportunities.'
  const defaultImage = 'https://gidipost-bloging-app.vercel.app/og-image.png'
  const defaultUrl = 'https://gidipost-bloging-app.vercel.app/'

  const seoTitle = title ? `${title} | Gidipost` : defaultTitle
  const seoDescription = description || defaultDescription
  const seoImage = image || defaultImage
  const seoUrl = url || defaultUrl

  return (
    <Helmet>
      {/* Primary */}
      <title>{seoTitle}</title>
      <meta name='description' content={seoDescription} />

      {/* Open Graph */}
      <meta property='og:type' content={type} />
      <meta property='og:url' content={seoUrl} />
      <meta property='og:title' content={seoTitle} />
      <meta property='og:description' content={seoDescription} />
      <meta property='og:image' content={seoImage} />
      <meta property='og:site_name' content='Gidipost' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:url' content={seoUrl} />
      <meta name='twitter:title' content={seoTitle} />
      <meta name='twitter:description' content={seoDescription} />
      <meta name='twitter:image' content={seoImage} />
      <meta name='twitter:site' content='@Gidipost' />
    </Helmet>
  )
}

export default SEO