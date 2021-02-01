const { getSyncClient, agilityConfig } = require('../../agility/agility.config')
const truncate  = require('truncate-html')

async function getAgilityContent() {

	const languageCode = agilityConfig.languageCode
	const isPreview = agilityConfig.isPreviewMode

	const syncClient = getSyncClient({isPreview})
	let posts = await syncClient.store.getContentList({ referenceName: "posts", languageCode })

	if (! posts) return {}

    return posts.map(p => {

		p.excerpt = truncate(p.fields.content, { length: 160, decodeEntities: true, stripTags: true, reserveLastWord: true })

		return p
	})
}

// export for 11ty
module.exports = getAgilityContent;