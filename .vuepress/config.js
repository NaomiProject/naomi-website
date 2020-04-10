const fs = require ('fs-extra')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const moment = require('moment')
const HighlightDsl = require('./highlight-dsl')
const HighlightRules = require('./highlight-rules')

const base = process.env.N_DOCS_VERSION ? `/v${process.env.N_DOCS_VERSION}/` : '/'

module.exports = {
    title: 'Project Naomi',
    description: 'The Naomi Project is an open source, technology agnostic platform for developing always-on, voice-controlled applications! Naomi software integrates different home text-to-speech & speech-to-text systems, plugins and technologies into a single solution. It provides uniform user interfaces, and a common approach for developing always-on, voice-controlled applications, regardless of the number of devices and sub-systems involved.',
    dest: 'Naomi-Website',
    host: 'localhost',
    base,
    ga: 'UA-130889564-1',
    shouldPrefetch: () => false,
    head: [
      ['link', { rel: 'stylesheet', href: `/fonts/fonts.css` }],            
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
      ['meta', { property: 'og:site_name', content:'Project Naomi' }],
      ['meta', { property: 'og:title', content:'Project Naomi' }],
      ['meta', { property: 'og:url', content:'https://www.projectnaomi.com/' }],
      ['meta', { property: 'og:type', content:'website' }],
      ['meta', { property: 'og:description', content:'The Naomi Project is an open source, technology agnostic platform for developing always-on, voice-controlled applications! Naomi software integrates different home text-to-speech & speech-to-text systems, plugins and technologies into a single solution. It provides uniform user interfaces, and a common approach for developing always-on, voice-controlled applications, regardless of the number of devices and sub-systems involved.' }],
      ['meta', { property: 'og:image', content:'https://www.projectnaomi.com/naomi-logo.png' }],
      ['meta', { property: 'og:image:url', content:'https://www.projectnaomi.com/naomi-logo.png' }],
      ['meta', { property: 'og:image:secure_url', content:'https://www.projectnaomi.com/naomi-logo.png' }],
      // Google+ / Schema.org
      ['meta', { itemprop:'name', content:'Project Naomi' }],
      ['meta', { itemprop:'headline', content:'Project Naomi' }],
      ['meta', { itemprop:'description', content:'The Naomi Project is an open source, technology agnostic platform for developing always-on, voice-controlled applications! Naomi software integrates different home text-to-speech & speech-to-text systems, plugins and technologies into a single solution. It provides uniform user interfaces, and a common approach for developing always-on, voice-controlled applications, regardless of the number of devices and sub-systems involved.' }],
      ['meta', { itemprop:'image', content:'https://www.projectnaomi.com/naomi-logo.png' }],
      ['meta', { itemprop:'author', content:'Austin Casteel' }],
      // Twitter Cards
      ['meta', { property: 'twitter:title', content:'Project Naomi' }],
      ['meta', { property: 'twitter:url', content:'https://www.projectnaomi.com/' }],
      ['meta', { property: 'twitter:description', content:'The Naomi Project is an open source, technology agnostic platform for developing always-on, voice-controlled applications! Naomi software integrates different home text-to-speech & speech-to-text systems, plugins and technologies into a single solution. It provides uniform user interfaces, and a common approach for developing always-on, voice-controlled applications, regardless of the number of devices and sub-systems involved.' }],
      ['meta', { property: 'twitter:image', content:'https://www.projectnaomi.com/hero.jpg' }],
      ['meta', { property: 'twitter:card', content:'summary_large_image' }],
      // SEO
      ['meta', { name:'author', content:'Austin Casteel' }],
      ['meta', { name:'publisher', content:'Project Naomi' }],
    ],
    markdown: {
      config: (md) => {
        md.options.linkify = true
        const highlight = md.options.highlight
        md.options.highlight = (str, lang) => {
          /* Simple heuristics to detect rules & other Naomi DSL code snippets and override the language */
          if (str.match(/\b(?:Color|Contact|Dimmer|Group|Number|Player|Rollershutter|Switch|Location|Frame|Default|Text|Group|Selection|Setpoint|Slider|Colorpicker|Chart|Webview|Mapview|Image|Video|Item|Thing|Bridge|Time|Type|Sitemap|sitemap)\b/)) {
            lang = 'dsl'
          }
          if (str.match(/\b(?:String|DateTime)\b/) && lang !== 'java' && lang !== 'xml') {
            lang = 'dsl'
          }
          if ((str.match(/\brule\b/) && str.match(/\bwhen\b/) && str.match(/\bthen\b/) && str.match(/\bend\b/)) ||
            str.match(/received update/) || str.match(/changed.*(?:from|to)/) || str.match(/Channel.*triggered/) ||
            str.match(/\bval\b/) || str.match(/\bvar\b/) /* <-- dangerous! */) {
            
            if (lang !== 'nginx' && lang !== 'shell') lang = 'rules'
          }
          if (lang === 'shell' || lang === 'sh' || lang === 'shell_session') lang = 'bash'
          if (lang === 'conf') lang = 'dsl'
          if (lang === 'JSON') lang = 'json'
  
          if (!Prism.languages.dsl || !Prism.languages.rules) {
            Prism.languages.dsl = HighlightDsl
            Prism.languages.rules = HighlightRules
          }
  
          return highlight(str, lang)
        }
      }
    },
    configureWebpack: (config, isServer) => {
      config.plugins.push(new CopyWebpackPlugin([
        { from: '.vuepress/_redirects', to: '.'},
        { from: '.vuepress/_headers', to: '.'},
      ]))
    },
    plugins: [
      [
        '@vuepress/last-updated',
        {
          transformer: (timestamp, lang) => {
            const moment = require('moment')
            moment.locale(lang)
            return moment(timestamp).fromNow()
          }
        }
      ]
    ],
    serviceWorker: false,
    themeConfig: {
      logo: '/naomi-logo.png',
      // repo: 'projectnaomi',
      editLinks: false,
      activeHeaderLinks: false,
      sidebarDepth: 0,
      docsDir: 'docs',
      search: true,
      searchMaxSuggestions: 10,
      lastUpdated: 'Last Updated',
      nav: [
        {
          text: 'Download',
          link: '/download/',
        },
        {
          text: 'Documentation',
          link: '/docs/',
        },
        {
          text: 'Support',
          link: '/support/',
        },
        {
          text: 'About',
          items: [
            {
              text: 'Get Involved',
              items: [
                {
                  text: 'Who We Are',
                  link: '/about/who-we-are',
                },
                {
                  text: 'Contribute',
                  link: '/about/contributing'
                },
              ]
            },
            {
              text: 'Resources',
              items: [
                {
                  text: 'Privacy Policy',
                  link: '/privacy'
                },
              ]
            },
            {
              text: 'Support Naomi',
              link: '/support-naomi/#Sponsor-Naomi',
              items: [
                {
                  text: 'One-time Donations',
                  link: '/support-naomi/#Sponsor-Naomi'
                },
                {
                  text: 'Recurring Pledges',
                  link: '/support-naomi/#Recurring-Pledges'
                },
                //{
                //    text: 'Foundation',
                //    link: 'https://foundation.projectnaomi.com/'
                //},
              ]
            },
          ]
        },
        {
          text: 'GitHub',
          link: 'https://github.com/naomiproject',
        }
      ],
      sidebar: {
        '/docs/': [
          {
            title: 'Welcome to Naomi',
            collapsable: false,
            children: [
              ''
            ]
          },
          {
            title: 'Installation Guide',
            collapsable: false,
            children: [
              'installation/',
              ['installation/linux', 'Linux'],
              ['installation/windows', 'Windows'],
              ['installation/macos', 'macOS'],
              ['installation/rasppi', 'Raspberry Pi'],
            ]
          },
          {
            title: 'Configuration Guide',
            collapsable: false,
            children: [
              ['configuration/', 'Configuration Overview'],
              'configuration/audio',
              'configuration/tts',
              'configuration/stt',
              'configuration/profile',
              'configuration/plugins',
            ]
          },
          {
            title: 'Plugins',
            collapsable: false,
            children: [
              'plugins/marytts-server',
              'plugins/pocketsphinx-install',
              'plugins/deepspeech-setup'
            ]
          },
          {
            title: 'Developer Guide',
            collapsable: false,
            children: [
              ['developer/', 'Development Overview'],
              'developer/contributing/contributing'
            ]
          }
        ],
        '/dev/docs/': [
          {
            title: 'Welcome to Naomi',
            collapsable: false,
            children: [
              ''
            ]
          },
          {
            title: 'Installation Guide',
            collapsable: false,
            children: [
              'installation/',
              ['installation/linux', 'Linux'],
              ['installation/windows', 'Windows'],
              ['installation/macos', 'macOS'],
              ['installation/rasppi', 'Raspberry Pi'],
              ['installation/naobian', 'Naobian'],
              ['installation/virtualbox', 'VirtualBox'],
              ['installation/docker', 'Docker'],
            ]
          },
          {
            title: 'Manual Configuration Guide',
            collapsable: true,
            children: [
              ['configuration/', 'Configuration Overview'],
              'configuration/audio',
              'configuration/tts',
              'configuration/stt',
              'configuration/vad',
              'configuration/profile',
              'configuration/plugins',
              'configuration/marytts-server',
              'configuration/pocketsphinx-install',
              'configuration/deepspeech-setup'
            ]
          },
          {
            title: 'Developer Guide',
            collapsable: true,
            children: [
              ['developer/', 'Development Overview'],
              'developer/contributing/contributing',
              'developer/plugins/',
              'developer/plugins/audioengine_plugin',
              'developer/plugins/speechhandler_plugin',
              'developer/plugins/tti_plugin',
              'developer/plugins/tts_plugin',
            ]
          },
        ]
      },
    }
  }
  