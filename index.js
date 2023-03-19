#!/usr/bin/env node

const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const process = require('process');

const Weather = require('./Weather');

const argv = yargs(hideBin(process.argv))
	.option('c', {
		alias: 'city',
		describe: 'Название города',
		type: 'string'
	})
	.demandOption('city', 'Для получения погоды необходимо ввести название города')
	.help()
	.argv;

Weather.get(argv.city)
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.log(err)
	});