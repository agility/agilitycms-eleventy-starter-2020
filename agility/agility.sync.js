


const { getSyncClient } = require('./agility.config')



const runSync = async (isPreview) => {
	if (isPreview === undefined) {
		isPreview = false
	}

	const agilitySyncClient = getSyncClient({ isPreview })
	if (! agilitySyncClient) {
		console.log("Agility CMS => Sync client could not be accessed.")
		return;
	}
	await agilitySyncClient.runSync();
}

const clearSync = async (isPreview) => {

	const agilitySyncClient = getSyncClient({ isPreview })
	if (! agilitySyncClient) {
		console.log("Agility CMS => Sync client could not be accessed.")
		return;
	}
	await agilitySyncClient.clearSync();

}


if (process.argv[2]) {
	if (process.argv[2] === "clear") {
		//clear everything

		return new Promise( async (resolve,reject) => {

			await  clearSync(true)
			await  clearSync(false)

		});

	} else if (process.argv[2] === "sync") {

		//run the sync
		return new Promise(async (resolve,reject) => {

			await  runSync(true)
			await  runSync(false)

		});




	}
}

module.exports = {
	clearSync,
	runSync
}