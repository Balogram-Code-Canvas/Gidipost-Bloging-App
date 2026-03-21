import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'

const PrivacyPolicy = () => {
  return (
    <div className='relative'>
      <img 
        src={assets.gradientBackground} 
        alt="" 
        className='absolute -top-[50px] -z-[1] opacity-50' 
      />

      <Navbar />

      <div className='max-w-3xl mx-auto px-5 py-20 text-gray-600'>

        <div className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-4'>
            Privacy Policy
          </h1>
          <p className='text-gray-500'>
            Last updated: March 2025
          </p>
        </div>

        {/* Introduction */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            Introduction
          </h2>
          <p className='leading-relaxed'>
            Welcome to Blogram. We are committed to protecting your 
            personal information and your right to privacy. This Privacy 
            Policy explains how we collect, use, and safeguard your 
            information when you visit our website at blogram-blog-app-0-1-trt6.vercel.app
          </p>
        </div>

        {/* Information We Collect */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            Information We Collect
          </h2>
          <p className='leading-relaxed mb-3'>
            We collect information that you voluntarily provide to us 
            when you interact with our website, including:
          </p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>Name and comments you submit on blog posts</li>
            <li>
              Information automatically collected when you visit 
              our site such as your IP address, browser type, 
              and pages visited
            </li>
            <li>
              Cookie data used to improve your browsing experience
            </li>
          </ul>
        </div>

        {/* How We Use Your Information */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            How We Use Your Information
          </h2>
          <p className='leading-relaxed mb-3'>
            We use the information we collect to:
          </p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>Display your comments on blog posts</li>
            <li>Improve and optimize our website</li>
            <li>Monitor and analyze usage and trends</li>
            <li>Serve relevant advertisements via Google AdSense</li>
            <li>Respond to your inquiries and requests</li>
          </ul>
        </div>

        {/* Advertising */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            Advertising
          </h2>
          <p className='leading-relaxed mb-3'>
            We use Google AdSense to display advertisements on our 
            website. Google AdSense uses cookies to serve ads based 
            on your prior visits to our website and other websites 
            on the internet.
          </p>
          <p className='leading-relaxed'>
            Google's use of advertising cookies enables it and its 
            partners to serve ads based on your visit to our site. 
            You may opt out of personalized advertising by visiting 
            Google's Ads Settings at{' '}
            <a 
              href='https://www.google.com/settings/ads' 
              target='_blank'
              rel='noreferrer'
              className='text-primary hover:underline'
            >
              www.google.com/settings/ads
            </a>
          </p>
        </div>

        {/* Cookies */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            Cookies
          </h2>
          <p className='leading-relaxed mb-3'>
            We use cookies to enhance your experience on our website. 
            Cookies are small text files stored on your device that 
            help us remember your preferences and understand how you 
            use our site.
          </p>
          <p className='leading-relaxed'>
            You can choose to disable cookies through your browser 
            settings. However, doing so may affect the functionality 
            of certain features on our website.
          </p>
        </div>

        {/* Third Party Services */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            Third Party Services
          </h2>
          <p className='leading-relaxed mb-3'>
            Our website uses the following third party services:
          </p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <b>Google AdSense</b> — for displaying advertisements
            </li>
            <li>
              <b>ImageKit</b> — for image hosting and optimization
            </li>
            <li>
              <b>MongoDB Atlas</b> — for secure data storage
            </li>
            <li>
              <b>Vercel</b> — for website hosting and deployment
            </li>
          </ul>
        </div>

        {/* Data Security */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            Data Security
          </h2>
          <p className='leading-relaxed'>
            We take reasonable measures to protect your information 
            from unauthorized access, use, or disclosure. However, 
            no internet transmission is completely secure, and we 
            cannot guarantee absolute security of your data.
          </p>
        </div>

        {/* Children's Privacy */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            Children's Privacy
          </h2>
          <p className='leading-relaxed'>
            Our website is not directed at children under the age 
            of 13. We do not knowingly collect personal information 
            from children. If you believe we have inadvertently 
            collected information from a child, please contact us 
            immediately.
          </p>
        </div>

        {/* Changes to This Policy */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            Changes to This Policy
          </h2>
          <p className='leading-relaxed'>
            We may update this Privacy Policy from time to time. 
            We will notify you of any changes by updating the date 
            at the top of this page. We encourage you to review 
            this policy periodically.
          </p>
        </div>

        {/* Contact Us */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>
            Contact Us
          </h2>
          <p className='leading-relaxed'>
            If you have any questions about this Privacy Policy, 
            please contact us at:
          </p>
          <div className='mt-3 p-4 bg-primary/5 border border-primary/20 rounded-lg'>
            <p><b>Blogram</b> — Balogram Studio</p>
            <p>Email: admin@blogram.com</p>
            <p>Website: blogram-blog-app-0-1-trt6.vercel.app</p>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy