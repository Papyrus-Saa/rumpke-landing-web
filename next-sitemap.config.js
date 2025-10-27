/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ichschenkedirwas.de',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/404', '/500', '/impressum', '/datenschutz', '/agb'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.ichschenkedirwas.de/sitemap.xml',
    ],
  },
};
