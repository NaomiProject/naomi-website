module.exports = {
  title: "Naomi Infrastructure Status",
  name: "Naomi Infrastructure Status",
  description: "The status page for Naomi infrastructure",
  baseUrl: "https://status.projectnaomi.com",
  serviceWorker: 'true',
  manifest: 'true',
  head: [
    // Icons
    ['link', { rel: 'apple-touch-icon', sizes:'57x57', href: '/apple-icon-57x57.png' }],
    ['link', { rel: 'apple-touch-icon', sizes:'60x60', href: '/apple-icon-60x60.png' }],
    ['link', { rel: 'apple-touch-icon', sizes:'72x72', href: '/apple-icon-72x72.png' }],
    ['link', { rel: 'apple-touch-icon', sizes:'76x76', href: '/apple-icon-76x76.png' }],
    ['link', { rel: 'apple-touch-icon', sizes:'114x114', href: '/apple-icon-114x114.png' }],
    ['link', { rel: 'apple-touch-icon', sizes:'120x120', href: '/apple-icon-120x120.png' }],
    ['link', { rel: 'apple-touch-icon', sizes:'144x144', href: '/apple-icon-144x144.png' }],
    ['link', { rel: 'apple-touch-icon', sizes:'152x152', href: '/apple-icon-152x152.png' }],
    ['link', { rel: 'apple-touch-icon', sizes:'180x180', href: '/apple-icon-180x180.png' }],
    ['link', { rel: 'icon', type:'image/png', sizes:'192x192',  href:'/android-icon-192x192.png' }],
    ['link', { rel: 'icon', type:'image/png', sizes:'32x32', href:'/favicon-32x32.png' }],
    ['link', { rel: 'icon', type:'image/png', sizes:'96x96', href:'/favicon-96x96.png' }],
    ['link', { rel: 'icon', type:'image/png', sizes:'16x16', href:'/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href:'/manifest.json' }],
    ['meta', { name: 'msapplication-TileColor', content:'#ffffff' }],
    ['meta', { name: 'msapplication-TileImage', content:'/ms-icon-144x144.png' }],
    // Facebook Open Graph
    ['meta', { property: 'og:locale', content:'en_US' }],
    ['meta', { property: 'og:site_name', content:'Status | Project Naomi' }],
    ['meta', { property: 'og:title', content:'Status | Project Naomi' }],
    ['meta', { property: 'og:url', content:'https://status.projectnaomi.com/' }],
    ['meta', { property: 'og:type', content:'website' }],
    ['meta', { property: 'og:description', content:'The Naomi Project is an open source, technology agnostic platform for developing always-on, voice-controlled applications! Naomi software integrates different home text-to-speech & speech-to-text systems, plugins and technologies into a single solution. It provides uniform user interfaces, and a common approach for developing always-on, voice-controlled applications, regardless of the number of devices and sub-systems involved.' }],
    ['meta', { property: 'og:image', content:'https://www.projectnaomi.com/naomi-logo.png' }],
    ['meta', { property: 'og:image:url', content:'https://www.projectnaomi.com/naomi-logo.png' }],
    ['meta', { property: 'og:image:secure_url', content:'https://www.projectnaomi.com/naomi-logo.png' }],
    // Google+ / Schema.org
    ['meta', { itemprop:'name', content:'Status | Project Naomi' }],
    ['meta', { itemprop:'headline', content:'Status | Project Naomi' }],
    ['meta', { itemprop:'description', content:'The Naomi Project is an open source, technology agnostic platform for developing always-on, voice-controlled applications! Naomi software integrates different home text-to-speech & speech-to-text systems, plugins and technologies into a single solution. It provides uniform user interfaces, and a common approach for developing always-on, voice-controlled applications, regardless of the number of devices and sub-systems involved.' }],
    ['meta', { itemprop:'image', content:'https://www.projectnaomi.com/naomi-logo.png' }],
    ['meta', { itemprop:'author', content:'Austin Casteel' }],
    // Twitter Cards
    ['meta', { property: 'twitter:title', content:'Status | Project Naomi' }],
    ['meta', { property: 'twitter:url', content:'https://status.projectnaomi.com/' }],
    ['meta', { property: 'twitter:description', content:'The Naomi Project is an open source, technology agnostic platform for developing always-on, voice-controlled applications! Naomi software integrates different home text-to-speech & speech-to-text systems, plugins and technologies into a single solution. It provides uniform user interfaces, and a common approach for developing always-on, voice-controlled applications, regardless of the number of devices and sub-systems involved.' }],
    ['meta', { property: 'twitter:image', content:'https://www.projectnaomi.com/hero.jpg' }],
    ['meta', { property: 'twitter:card', content:'summary_large_image' }],
    // SEO
    ['meta', { name:'author', content:'Austin Casteel' }],
    ['meta', { name:'publisher', content:'Project Naomi' }],
  ],
  defaultLocale: "en",
  locales: [
    { code: "en", iso: "en-US", name: "English", file: "en.json" }
  ],
  content: {
    frontMatterFormat: 'toml',
    systems: [
      'cdn',
      'site-delivery',
      'api'
    ]
  },
  theme: {
    scheduled: {
      position: 'aboveGlobalStatus'
    },
    links: {
      en: {
        //contact: "https://projectnaomi.com/contact",
        support: "https://projectnaomi.com/support",
        home: "https://projectnaomi.com",
        privacy: "https://projectnaomi.com/privacy.html",
        legal: "https://projectnaomi.com/imprint.html"
      },
    },
    notifications: {
      webpush: {
        onesignal: {
          appId: "6941872b-d99d-458e-8820-600afd329bb6"
        }
      },
      icalendar: 'true',
      feeds: 'true',
      support: {
        en: "https://projectnaomi.com/support",
      }
    }
  },
}