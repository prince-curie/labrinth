import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('pairs', (table) => {
        table.increments('id')
        table.string('pair_id').unique()
        table.string('token0_id')
        table.string('token1_id')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('pairs')
}

