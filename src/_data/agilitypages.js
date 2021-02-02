const { getSyncClient, agilityConfig } = require('../../agility/agility.config')
const luxon = require("luxon")

async function getAgilityContent() {

	const languageCode = agilityConfig.languageCode
	const channelName = agilityConfig.channelName
	const isPreview = agilityConfig.isPreviewMode

	if (isPreview) {
		console.log("Agility CMS => Building site in preview mode.")
	} else {
		console.log("Agility CMS => Building site in live mode.")
	}


    const syncClient = getSyncClient({isPreview})

	let sitemap = await syncClient.store.getSitemap({ channelName, languageCode })

	if (! sitemap) {
		console.warn("Agility CMS => No Sitemap Found - try running a sync (npm run cms-pull)")
	}

	let pages = []
	for (const key in sitemap) {

		let node = sitemap[key]

		if (node.isFolder || node.redirect) {
			continue
		}

		//get the page for this sitemap object
		let agilitypage = await syncClient.store.getPage({pageID: node.pageID, languageCode, contentLinkDepth: 3})


		//the first page in the sitemap is always the home page
		if (pages.length === 0) {
			node.path = "/"
		}

		agilitypage.sitemapNode = node;

		//resolve the page template
		if (agilitypage.templateName !== undefined && agilitypage.templateName) {
			agilitypage.templateFileName = `${agilitypage.templateName.replace(/ /ig, '-').toLowerCase()}`
		}


		//if this is a dynamic page item, get the content for it
		agilitypage.dynamicPageItem = null
		if (node.contentID !== undefined && node.contentID > 0) {
			const dynamicPageItem = await syncClient.store.getContentItem({ contentID: node.contentID, languageCode, contentLinkDepth: 2 })


			if (dynamicPageItem) {
				agilitypage.title = dynamicPageItem.fields.title
				if (dynamicPageItem.seo) {
					agilitypage.seo.metaDescription = dynamicPageItem.seo.metaDescription
				}

				if (dynamicPageItem.properties.definitionName === "Post") {

					dynamicPageItem.tagNames = dynamicPageItem.fields.tags.map(p => p.fields.title).join(",")
					dynamicPageItem.dateStr =  luxon.DateTime.fromISO(dynamicPageItem.fields.date).toFormat("LLLL dd, yyyy")

					if (dynamicPageItem.fields.image) {
						agilitypage.seo.ogImage =  `${dynamicPageItem.fields.image.url}?w=1024`
					}
				}

				agilitypage.dynamicPageItem = dynamicPageItem

			}

		}

		pages.push(agilitypage)

	}

    return pages
}

// export for 11ty
module.exports = getAgilityContent;