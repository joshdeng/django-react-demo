import * as utils from '../utils/utils';

// define test data
const testURL = 'https://shudong-test.firebaseio.com/';
const testUploadTableName = 'upload';
const testDownloadTableName = 'download';
const testUpdateTableName = 'update';
const testUpdateDataID = '-L6NOorcA4HD3Mw7TNUb';
var testObjKey: null|string = null;

const testData = {
	username: 'test-name',
	content: 'test-content',
	messageID: utils.dateID()
};

const dropData = function(): void {
	const request = {
		method: 'DELETE',
		'Access-Control-Allow-Origin': '*'
	};

	if (testObjKey) {
		fetch(`${testURL}${testUploadTableName}/${testObjKey}.json`, request);
	}
};

// rest api call tests
describe('Testing API calls', function() {

	it ('should be able to post data to database', function() {
		return utils.postData(testData,  testUploadTableName , testURL).then((res) => {
			expect(res.name).toBeTruthy();
			testObjKey = res.name;
			dropData();
			});
		});

	it ('should be able to fetch data from database', function() {
		return utils.fetchData(testDownloadTableName, testURL).then((res) => {
			expect(utils.objToArray(res).length).toBe(3);
			});
		});

	it ('should be able to update data from database', function() {
		let updateData = Object.assign({}, testData);
		let updateID =  utils.dateID();
		updateData.messageID = updateID;

		return utils.updateData(updateData, testUpdateTableName, testUpdateDataID, testURL).then((res) => {
			expect(res.messageID).toBe(updateID);
		});
	});
});

// utility function tests
describe('Testing Utility Functions', function() {
	
	it ('ID generator should generate ID as a number greater than 0', function() {
		expect(utils.dateID()).toBeGreaterThan(0);
	});

	it ('Object to array function should return the correct value', function() {
			const testObj = {
				'0': {
					name: 'a'
				},
				'1': {
					name: 'b'
				},
				'2': {
					name: 'c'
				}

			};
			expect(utils.objToArray(testObj)).toEqual([
				{ name: 'a', fireID: '0' },
				{ name: 'b', fireID: '1' },
				{ name: 'c', fireID: '2' } 
			]);
		});
});
