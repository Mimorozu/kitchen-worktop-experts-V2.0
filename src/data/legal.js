// src/data/legal.js
// Legal copy for the privacy policy, terms of use and cookie notice.
// Written in plain English. Have a solicitor check it before relying on it.

export const COMPANY = {
  name: 'Kitchen Worktop Experts',
  email: 'office@kitchenworktopexperts.co.uk',
  phone: '07389 185503',
}

const UPDATED = '24 November 2026'

export const LEGAL_DOCS = {
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'How Kitchen Worktop Experts collects, uses and protects your personal information.',
    updated: UPDATED,
    sections: [
      {
        heading: 'Who we are',
        body: [
          `${COMPANY.name} runs this website and supplies and fits worktops across the West Midlands.`,
          `Questions about this policy: ${COMPANY.email}.`,
        ],
      },
      {
        heading: 'What we collect',
        body: [
          'When you request a quote, we collect your name, email address, phone number, postcode, the material you are interested in and the size of your kitchen.',
          'When you visit the site, cookies and similar technologies collect information about how you use it. See the Cookie Notice for details.',
        ],
      },
      {
        heading: 'Why we use it',
        body: [
          'To prepare your quote and contact you about it, because you asked us to.',
          'To understand how the site is used and to measure our advertising.',
          'To meet our legal and accounting obligations.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: [
          'We pass your quote details to our customer relationship management (CRM) system so a local specialist can contact you.',
          'Google Analytics, Google Ads and Microsoft Clarity may receive usage data from the site. See the Cookie Notice.',
          'We do not sell your personal information.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'We keep quote enquiries for two years. If you become a customer, we keep your details for the length of the job and for the period needed for warranty and accounts.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can ask to see, correct or delete the personal information we hold about you, and you can object to or restrict how we use it. Email us at the address above to do so.',
          'You can complain to the Information Commissioner\'s Office at ico.org.uk.',
        ],
      },
    ],
  },

  terms: {
    path: '/terms',
    title: 'Terms of Use',
    description: 'The terms that apply when you use the Kitchen Worktop Experts website and request a quote.',
    updated: UPDATED,
    sections: [
      {
        heading: 'Using this website',
        body: [
          `This website is run by ${COMPANY.name}. By using it you agree to these terms. If you do not agree, please do not use the site.`,
          'The information on this site is for general guidance. We aim to keep it accurate, but we cannot guarantee that it is complete or up to date.',
        ],
      },
      {
        heading: 'Online estimates',
        body: [
          'The estimate shown after you submit the quote form is indicative only. It is not an offer or a fixed price.',
          'Your final quote is confirmed after a specialist has measured your kitchen and talked through your choice of material.',
        ],
      },
      {
        heading: 'Quotes and orders',
        body: [
          'A quote is free and does not oblige you to buy.',
          'A binding contract is formed only when we confirm your order in writing. Our terms for supply and fitting are provided with that confirmation.',
        ],
      },
      {
        heading: 'Images and materials',
        body: [
          'Photographs of finished kitchens and of stone are for illustration. Natural stone and quartz vary in colour and pattern, so your finished worktop may look slightly different from the images on this site.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or for anything else that the law does not allow us to limit.',
          'Beyond that, we are responsible for losses that were a foreseeable result of our work and that you can show we caused.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The content of this site, including text, images and logos, belongs to us or our licensors. Please do not copy it for commercial use without our permission.',
        ],
      },
      {
        heading: 'Governing law',
        body: [
          'These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction.',
        ],
      },
    ],
  },

  cookies: {
    path: '/cookies',
    title: 'Cookie Notice',
    description: 'Which cookies and similar technologies this site uses, and how to control them.',
    updated: UPDATED,
    sections: [
      {
        heading: 'What cookies are',
        body: [
          'Cookies are small files stored on your device. Similar technologies, such as local storage, work the same way. We use them to run the site and to understand how it is used.',
        ],
      },
      {
        heading: 'Cookies we use',
        body: [
          'Analytics: Google Analytics (GA4) measures how visitors use the site, including the quote form, so we can improve it.',
          'Advertising: Google Ads measures how our adverts perform and may use cookies to show relevant ads.',
          'Session recording: Microsoft Clarity records anonymised interactions such as clicks and scrolling, to help us find usability problems.',
        ],
      },
      {
        heading: 'Your choices',
        body: [
          'These cookies are only set if you accept them in the cookie banner. If you reject them, they are not set. To change your choice, clear this site’s stored data in your browser and the banner will appear again. You can also block or delete cookies in your browser settings, though some features may stop working.',
          'You can opt out of Google Analytics and Google Ads personalised advertising through Google\'s own settings, and Microsoft Clarity offers its own opt-out.',
        ],
      },
      {
        heading: 'More information',
        body: [
          `Questions about cookies: ${COMPANY.email}. Our Privacy Policy explains how we handle personal information.`,
        ],
      },
    ],
  },
}
