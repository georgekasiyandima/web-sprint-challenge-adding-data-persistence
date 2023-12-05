/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.createTable('resources', function (table) {
    table.increments('resource_id').primary();
    table.string('resource_name').notNullable().unique();
    table.string('resource_description');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("resources");
};
