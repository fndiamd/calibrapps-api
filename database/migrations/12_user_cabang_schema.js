'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCabangSchema extends Schema {
  up() {
    this.create('user_cabangs', (table) => {
      table.increments('user_cabang_id')
      table.string('user_cabang_nama', 150).notNullable()
      table.string('user_cabang_email', 150).notNullable().unique()
      table.string('user_cabang_password', 150).notNullable()
      table.string('user_cabang_telepon', 20)
      table.text('user_cabang_alamat', 'mediumtext')
      table.integer('kantor_cabang_id')
        .notNullable()
        .unsigned()
        .references('kantor_cabang_id')
        .inTable('kantor_cabangs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('user_role_id')
        .unsigned()
        .references('user_role_id')
        .inTable('user_roles')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('user_cabangs')
  }
}

module.exports = UserCabangSchema
