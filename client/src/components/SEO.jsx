import React from 'react'
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
  const defaultUrl = 'https://gidipost-bloging-app.vercel.app'

  const seoTitle = title ? `${title} | Gidipost` : defaultTitle
  const seoDescription = description || defaultDescription
  const seoImage = image || defaultImage
  const seoUrl = url || defaultUrl

  return (
    <Helmet>
      {/* Primary */}
      <title>{seoTitle}</title>
      <meta name='description' content={seoDescription} />

      {/* Open Graph - Works for WhatsApp, Facebook, LinkedIn */}
      <meta property='og:type' content={type} />
      <meta property='og:url' content={seoUrl} />
      <meta property='og:title' content={seoTitle} />
      <meta property='og:description' content={seoDescription} />
      <meta property='og:image' content={seoImage} />
      <meta property='og:image:secure_url' content={seoImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:type' content='image/png' />
      <meta property='og:image:alt' content={seoTitle} />
      <meta property='og:site_name' content='Gidipost' />
      <meta property='og:locale' content='en_US' />

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
