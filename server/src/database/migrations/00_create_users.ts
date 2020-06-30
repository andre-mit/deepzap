import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.uuid('id').unique().notNullable().primary();
        table.string('email').notNullable().unique();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('photo').nullable();
    });
}


export async function down(knex:Knex) {
    return knex.schema.dropTable('users');
}