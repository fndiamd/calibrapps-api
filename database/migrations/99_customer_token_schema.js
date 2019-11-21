'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerTokenSchema extends Schema {
  up() {
    this.create('customer_tokens', (table) => {
      table.increments('customer_token_id')
      table.integer('user_customer_id')
        .unsigned()
        .references('user_customer_id')
        .inTable('user_customers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('customer_tokens')
  }
}

module.exports = CustomerTokenSchema
