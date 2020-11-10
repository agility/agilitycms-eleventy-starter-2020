const { getSyncClient, agilityConfig } = require('../../agility/agility.config')
const truncate  = require('truncate-html')

async function getAgilityContent() {

	const languageCode = agilityConfig.languageCode
	const isPreview = agilityConfig.isPreviewMode
	const channelName = agilityConfig.channelName

	const syncClient = getSyncClient({isPreview})
	let nestedSitemap = await syncClient.store.getSitemapNested({ channelName, languageCode })

	if (! nestedSitemap) return {}

	let globalHeader = await syncClient.store.getContentList({ referenceName: "globalheader", languageCode })
	if (globalHeader && globalHeader.length > 0) globalHeader = globalHeader[0]

	let globalFooter = await syncClient.store.getContentList({ referenceName: "globalfooter", languageCode })
	if (globalFooter && globalFooter.length > 0) globalFooter = globalFooter[0]

	let navigation = nestedSitemap.filter(n => n.visible.menu)



	return {
		navigation,
		globalHeader,
		globalFooter,
		isPreview,
		test : JSON.stringify(globalHeader)
	}
}

// export for 11ty
module.exports = getAgilityContent;