
const partnerKey = '7ze1d587238s7524f73k3333';
const appId = 'test.app.id';
const userId = 'userId0981238763425';
const channelId = 'philips-hue';

const bundleToInstantiate = {
	bundleId: '5dfb9f675f4cf381a8f4bf9c',
	name: 'test_SDK',
	category: 'sustainable',
	sortKey: 1,
	wizardOutput:
	[
		[
			'5c541927962d7b5cb63ee598',
			{
				endpoint: 'geofencing.5c545fe2468bc962fc28aacc',
				_id: '5c545fe2468bc962fc28aacc',
			},
		],
		[
			[
				{
					endpoint: 'tplink.80121B61A8C743DBFB6142DE6D1B926B1B6763E5',
					_id: '5d6ce03e5596f54f5a6391ec',
				},
			],
		],
	],
};

const channelListener = function(data) {
	console.log(data.channel + ' channel is ' + data.status);
};

const api = OlistoApi.init(partnerKey, appId, userId);

api.getUserContext(userId).then(data => {
	console.log('Token:  ' + api._accessToken);
	// startInitChannel();
	getBundelsList();
	// getUserBundles();
});

// Get bundels created from the partner
function getBundelsList() {
	api.getBundleTemplates().then(bundles => {
		console.log('Partners bundels:');
		console.log(bundles);

		const bundle = bundles[0];
		// Get the input from the first bundle
		if (bundle) {
			// bundle.pages[0].inputs[1].editor.getOptions().then((options) => {
			// 	console.log(options);
			// }).catch(handleError);
			const instanceBundle = bundle.getInstance();
			instanceBundle.pages[0].inputs[0].getUnits().then((units) => {
				const setResult = instanceBundle.pages[0].inputs[0].setValue({
					_id: units[0]._id,
					endpoint: units[0].endpoint,
				});

				console.log('Set is valid: ' + setResult);
				return instanceBundle.pages[0].inputs[1].getUnits();
			}).then((ligths) => {
				const setResult = instanceBundle.pages[0].inputs[1].setValue([{
					_id: ligths[0]._id,
					endpoint: ligths[0].endpoint,
				}]);
				console.log('Set is valid: ' + setResult);
				return instanceBundle.save('Bundle test Michael');
			}).then((bundleSaved) => {
				console.log('*******************');
				console.log(JSON.stringify(bundleSaved));
			}).catch(handleError);

			// api.instantiateBundle(bundleToInstantiate).then(data => {
			// 	console.log('----------------');
			// 	console.log(data);
			// 	api.removeBundle(data._id);
			// });
		}
	}).catch(handleError);
}


// Get user bundels
function getUserBundles() {
	api.getUserBundles().then(bundles => {
		console.log('User instantiated bundels:');
		console.log(bundles);
	}).catch(handleError);
}

function startInitChannel() {
	api.openInitChannel(channelId, channelListener);
}


function handleError(error) {
	console.log(error.toString());
	console.log(JSON.stringify(error));
}
