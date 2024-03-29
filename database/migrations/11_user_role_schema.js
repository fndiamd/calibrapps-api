'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRoleSchema extends Schema {
  up () {
    this.create('user_roles', (table) => {
      table.increments('user_role_id')
      table.string('user_role_keterangan', 100).notNullable().unique()
      table.string('user_role_warna', 50).notNullable().unique()
    })
  }

  down () {
    this.drop('user_roles')
  }
}

module.exports = UserRoleSchema
