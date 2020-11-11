const { getSyncClient, agilityConfig } = require('../../agility/agility.config')
const truncate  = require('truncate-html')
const { expandLinkedList } = require("../../agility/utils")

async function getAgilityContent() {

	const languageCode = agilityConfig.languageCode
	const isPreview = agilityConfig.isPreviewMode
	const channelName = agilityConfig.channelName
	const syncClient = getSyncClient({isPreview})
	const agility = syncClient.store


	let nestedSitemap = await agility.getSitemapNested({ channelName, languageCode })

	if (! nestedSitemap) return {}

	let globalHeader = await agility.getContentList({ referenceName: "globalheader", languageCode })
	if (globalHeader && globalHeader.length > 0) globalHeader = globalHeader[0]

	let globalFooter = await agility.getContentList({ referenceName: "globalfooter", languageCode })
	if (globalFooter && globalFooter.length > 0) globalFooter = globalFooter[0]


	//resolve the links...
	globalFooter = await expandLinkedList({ agility, contentItem:globalFooter, languageCode,
		fieldName: "column2Links",
		sortIDField: "column2SortIDs"
	})

	globalFooter = await expandLinkedList({ agility, contentItem:globalFooter, languageCode,
		fieldName: "column3Links",
		sortIDField: "column3SortIDs"
	})

	globalFooter = await expandLinkedList({ agility, contentItem:globalFooter, languageCode,
		fieldName: "column4Links",
		sortIDField: "column4SortIDs"
	})

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