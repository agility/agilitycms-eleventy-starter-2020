const { getSyncClient } = require('../agility/agility.config')


async function getAgilityContent() {

	const languageCode = "en-us"
	const channelName = "website"

    const syncClient = getSyncClient({isPreview:true})

	let sitemap = await syncClient.store.getSitemap({ channelName, languageCode })
	let nestedSitemap = await syncClient.store.getSitemapNested({ channelName, languageCode })
	let globalHeader = await syncClient.store.getContentList({ referenceName: "globalheader", languageCode })
	if (globalHeader && globalHeader.length > 0) globalHeader = globalHeader[0]

	let navigation = nestedSitemap.filter(n => n.visible.menu)

	let pages = []
	for (const key in sitemap) {

		let node = sitemap[key]
		let page = await syncClient.store.getPage({pageID: node.pageID, languageCode, contentLinkDepth: 3})

		if (pages.length === 0) {
			node.path = "/"
		}

		page.sitemapNode = node;
		if (page.templateName !== undefined && page.templateName) {
			page.templateFileName = `${page.templateName.replace(/ /ig, '-').toLowerCase()}`
		}

		pages.push(page)

	}



    return {
		pages: pages,
		navigation: navigation,
		globalHeader: globalHeader
    }
}

// export for 11ty
module.exports = getAgilityContent;