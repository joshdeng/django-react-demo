import { URL_PREFIX } from '../constants/index';

// fetch data from database using rest api
export function fetchData(tableName: string, url?: string) {
	const request = {
		method: 'GET',
		'Access-Control-Allow-Origin': '*'
	};

	let urlPrifix: string = '';
	url ? urlPrifix = url : urlPrifix = URL_PREFIX;

	return fetch(`${urlPrifix}${tableName}/`, request)
		.then(res => {
			return res.json();
		})
		.catch(function(err: object) {
			return err;
		}
	);
}

// post data to database using rest api
export function postData(data: object, table: string, url?: string) {
	const request = {
		method: 'POST',
		'Access-Control-Allow-Origin': '*',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
					'Accept': 'application/json'
		}
	};

	let urlPrifix: string = null;

	url ? urlPrifix = url : urlPrifix = URL_PREFIX;

	return fetch(`${urlPrifix}${table}/`, request)
		.then(res => {
			return res.json();
		})
		.catch(function(err: object) {
			return err;
		}
	);
}

// update comments in data base using rest api
export function updateComments(data: object, table: string, id: number, url?: string) {
	const request = {
		method: 'POST',
		'Access-Control-Allow-Origin': '*',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
					'Accept': 'application/json'
		}
	};
	
	let urlPrifix: string = null;
	url ? urlPrifix = url : urlPrifix = URL_PREFIX;

	return fetch(`${urlPrifix}${table}/`, request)
		.then(res => {
			return res.json();
		})
		.catch(function(err: object) {
			return err;
		}
	);
}

// generate id base on date object
export function dateID(): number {

	let id: number = new Date().valueOf();
	return id;

}

//  parse object to array
export function objToArray(obj: object) {
	var dataArray = [];
	for (var o in obj) {
		if (obj[o]) {
			let temp = obj[o];
			temp.id = parseInt(o, 10) + 1;
			dataArray.push(temp);
		}
	}
	return dataArray;
}
