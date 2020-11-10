const { getSyncClient, agilityConfig } = require('../../agility/agility.config')
const truncate  = require('truncate-html')

async function getAgilityContent() {

	const languageCode = agilityConfig.languageCode
	const isPreview = agilityConfig.isPreviewMode
	const channelName = agilityConfig.channelName

	const syncClient = getSyncClient({isPreview})
	const redirects = await syncClient.store.getUrlRedirections({ languageCode });

	if (! redirects || ! redirects.items) return;
	let lst = []

	let sitemap = await syncClient.store.getSitemap({ channelName, languageCode })
	if (sitemap) {
		let i = 0;
		for (const key in sitemap) {

			let node = sitemap[key]

			//the first page in the sitemap is always the home page
			if (i === 0) {
				lst.push({
					originUrl: node.path,
					destinationUrl: "/"
				})
			}

			if (node.redirect && node.redirect.url) {
console.log(node)
				//link pages...
				let redirectUrl = node.redirect.url;
				if (redirectUrl.indexOf("~/") == 0) redirectUrl = redirectUrl.substring(1);

				lst.push({
					originUrl: node.path,
					destinationUrl: redirectUrl
				})
			}
			++i;
		}

		//add the default redirects
		redirects.items.forEach(redirect => {

			let originUrl = redirect.originUrl;
			let destUrl = redirect.destinationUrl;
			if (originUrl.indexOf("~/") == 0) originUrl = originUrl.substring(1);
			if (destUrl.indexOf("~/") == 0) destUrl = destUrl.substring(1);

			lst.push({
				originUrl,
				destinationUrl: destUrl
			})
		});
	}

	return lst
}

// export for 11ty
module.exports = getAgilityContent;