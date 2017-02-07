/**
 * When using db-migrate, the CLI should work most of the time:
 *
 * ```
 * $ db-migrate up
 * ```
 *
 * However, if the migration code calls Service and Model
 * methods directly, then we need to manually close the
 * connection. This file will take care of this for us. Instead
 * of running the `db-migrate` command, run this file instead.
 * Note: This works with multiple migrations.
 *
 * ```
 * $ node migrate.js
 * ```
 */

const DBMigrate = require('db-migrate');
const mongoose = require('mongoose');

const options = {};

// Travis runs db-migrate without passing NODE_ENV
if (!process.env.NODE_ENV){
	options.env = 'dev';
}

const instance = DBMigrate.getInstance(true, options);

// same as running `db-migrate up`
instance.up(() => {
	mongoose.connections.forEach(conn => conn.close());
});