// db-config
// This creates a configured knex instance that is used in the model
const knex = require("knex");

const config = require("../knexfile.js");

module.exports = knex(config.development);
