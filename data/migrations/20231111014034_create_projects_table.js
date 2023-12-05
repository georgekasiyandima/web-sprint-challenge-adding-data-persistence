/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('projects', function (table) {
    table.increments('project_id').primary();
    table.string('project_name').notNullable();
    table.string('project_description');
    table.boolean('project_completed').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('projects');
};
