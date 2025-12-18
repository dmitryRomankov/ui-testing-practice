const blockedResources = [
  'googlesyndication.com',
  'doubleclick.net',
  'google-analytics.com',
  'adnxs.com',
  'advertising.com',
  'adform.net',
  'criteo.com',
  'taboola.com',
  'outbrain.com',
  'pubmatic.com',
  'rubiconproject.com',
  'moatads.com',
  'adsrvr.org',
  'adroll.com',
  'advertising.com',
  'adtechus.com',
  'amazon-adsystem.com',
  'adcolony.com',
  'adform.net',
  'adroll.com',
  'adsrvr.org',
  'adtechus.com',
  'advertising.com',
  'amazon-adsystem.com',
  'criteo.com',
  'doubleclick.net',
  'google-analytics.com',
  'googlesyndication.com',
  'moatads.com',
  'outbrain.com',
  'pubmatic.com',
  'rubiconproject.com',
  'taboola.com',
];

class AdBlock {
  static async blockAds(page) {
    await page.route('**/*', route => {
      const url = route.request().url();
      const isResourceIncluded = blockedResources.some(resource => url.includes(resource));
      if (isResourceIncluded) {
        route.abort();
      } else {
        route.continue();
      }
    });
  }
}

export default AdBlock;
