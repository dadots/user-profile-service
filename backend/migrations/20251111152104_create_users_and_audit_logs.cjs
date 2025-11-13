/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('users', (table) => {
        table.bigIncrements('id').primary();
        table.string('email', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.string('name', 255).nullable();
        table.text('bio').nullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .onUpdate(knex.raw('CURRENT_TIMESTAMP'));
    });

    await knex.schema.createTable('audit_logs', (table) => {
        table.bigIncrements('id').primary();
        table.bigInteger('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.string('action', 100).notNullable();
        table.json('details').nullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('audit_logs');
    await knex.schema.dropTableIfExists('users');
};
