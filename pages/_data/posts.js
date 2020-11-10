const { getSyncClient } = require('../../agility/agility.config')
const truncate  = require('truncate-html')

async function getAgilityContent() {

	const languageCode = "en-us"
	const syncClient = getSyncClient({isPreview:true})
	let posts = await syncClient.store.getContentList({ referenceName: "posts", languageCode })

    return posts.map(p => {

		p.excerpt = truncate(p.fields.content, { length: 160, decodeEntities: true, stripTags: true, reserveLastWord: true })

		return p
	})
}

// export for 11ty
module.exports = getAgilityContent;