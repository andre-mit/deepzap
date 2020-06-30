import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('messages', table => {
        
        table.increments('id').primary();

        table.string('message').notNullable();

        table.uuid('sentUser')
            .notNullable()
            .references('email')
            .inTable('users');

        table.uuid('receiverUser')
            .notNullable()
            .references('id')
            .inTable('users');

        table.dateTime('date').notNullable();
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('messages');
}