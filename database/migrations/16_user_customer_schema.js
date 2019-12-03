'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCustomerSchema extends Schema {
  up() {
    this.create('user_customers', (table) => {
      table.increments('user_customer_id')
      table.string('user_customer_nama', 150).notNullable()
      table.string('user_customer_email', 150).notNullable().unique()
      table.string('user_customer_password', 150).notNullable()
      table.string('user_customer_telepon', 20)
      table.text('user_customer_alamat', 'mediumtext')
      table.integer('user_customer_status').defaultTo(0)
      table.integer('customer_perusahaan_id')
        .notNullable()
        .unsigned()
        .references('customer_perusahaan_id')
        .inTable('customer_perusahaans')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('customer_role_id')
        .unsigned()
        .references('customer_role_id')
        .inTable('customer_roles')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('user_customers')
  }
}

module.exports = UserCustomerSchema
