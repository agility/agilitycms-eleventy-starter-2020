
require('dotenv').config()

const { getSyncClient } = require('./agility.config')

const runBuild = async ({isPreview}) => {

	const agilitySyncClient = getSyncClient({ isPreview })
	if (! agilitySyncClient) {
		console.log("Agility CMS => Sync client could not be accessed.")
		return;
	}

	//do the sync...
	await agilitySyncClient.runSync();

	//do the build

}


if (process.argv[1]) {
	if (process.argv[1] === "preview") {

		return runBuild({isPreview: true})

	} else if (process.argv[1] === "live") {

		return runBuild({isPreview: false})

	}
}