const { resolve } = require('dns');
const http = require('http');
const process = require('node:process');
require('dotenv').config();
const { weatherstackAPI, urlWeatherStack } = process.env;

class Weather {
	static get(city) {
		const urlWS = new URL(urlWeatherStack);
		urlWS.pathname = '/current';
		urlWS.search = `access_key=${weatherstackAPI}` + 
                        `&query=${city}`;
        
		return new Promise((resolve, reject) => {
			http.get(urlWS, response => {
				if (response.statusCode !== 200) {
					resolve(`statusCode: ${response.statusCode}`)
				}

				response.setEncoding('utf8');
				let rowData = '';

				response
					.on('data', chunk => rowData += chunk)
					.on('end', () => {
						resolve(JSON.parse(rowData))
					})
			}).on('error', err => {
				reject(err);
			})
		})
	}
}

module.exports = Weather;