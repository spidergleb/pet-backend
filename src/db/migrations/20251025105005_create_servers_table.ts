import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("servers", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("distance").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("servers");
}
