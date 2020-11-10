
const agilityContentSync = require('@agility/content-sync')
const agilityFileSystem = require("@agility/content-sync/src/store-interface-filesystem")

require('dotenv').config()


const agilityConfig = {
	guid: process.env.AGILITY_GUID,
	fetchAPIKey: process.env.AGILITY_API_FETCH_KEY, //Set your fetch apikey here
	previewAPIKey: process.env.AGILITY_API_PREVIEW_KEY, //set your preview apikey
	languageCode: process.env.AGILITY_LANGUAGE_CODE,  //the language for your website in Agility CMS
	channelName: process.env.AGILITY_CHANNEL_NAME, //the name of your channel in Agility CMS
	isPreviewMode: process.env.NODE_ENV === "development"
}

const getSyncClient = ({ isPreview }) => {

	let cachePath = `node_modules/@agility/content-sync/cache/${isPreview ? 'preview' : 'live'}`

	const apiKey = isPreview ? agilityConfig.previewAPIKey : agilityConfig.fetchAPIKey

	if (! agilityConfig.guid) {
		console.log("Agility CMS => No GUID was provided.")
		return null
	}

	return agilityContentSync.getSyncClient({
		guid: agilityConfig.guid,
		apiKey: apiKey,
		isPreview: isPreview,
		languages: [agilityConfig.languageCode],
		channels: [agilityConfig.channelName],
		store: {
			interface: agilityFileSystem,
			options: {
				rootPath: cachePath
			}
		}
	})
}


module.exports = {
	agilityConfig,
	getSyncClient
}
