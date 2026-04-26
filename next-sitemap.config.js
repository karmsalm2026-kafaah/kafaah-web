/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://kafaahsolutions.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/icon.svg', '/apple-icon.png'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
