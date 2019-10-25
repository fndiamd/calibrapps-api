'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerRoleSchema extends Schema {
  up () {
    this.create('customer_roles', (table) => {
      table.increments('customer_role_id')
      table.string('customer_role_keterangan', 100).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('customer_roles')
  }
}

module.exports = CustomerRoleSchema
