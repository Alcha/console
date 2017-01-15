#! /usr/bin/env node

const yargs = require('yargs');
const blizzard = require('blizzard.js').initialize({ apikey: process.env.BATTLENET_CLIENT_ID });

const request = yargs
  .command({
    command: 'character',
    describe: 'Fetch a World of Warcraft Character',
    builder: (yargs) => {
      return yargs
        .options({
          origin: {
            alias: 'o',
            describe: 'The API endpoint to make the request to',
            choices: ['us', 'eu'],
            default: 'us',
          },
          realm: {
            alias: 'r',
            describe: 'The [realm] of the {character}',
            type: 'string'
          },
          name: {
            alias: 'n',
            describe: 'The [name] of the {character}',
            type: 'string'
          },
        })
        .demandOption(['realm', 'name'], 'Please provide at least the [realm] and [name] of the {character}');
    },
    handler: (argv) => {
      const {origin, realm, name} = argv;
      const test = {origin, realm, name};
      console.log(test);

      return blizzard.wow.character(['profile'], {origin, realm, name})
        .then(response => {
          console.log(JSON.stringify(response.data));
        });
    }
  }).argv;

module.exports = request;