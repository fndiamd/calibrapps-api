'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCabangSchema extends Schema {
  up () {
    this.create('user_cabangs', (table) => {
      table.increments('user_cabang_id')
      table.string('user_cabang_nama', '100').notNullable()
      table.string('user_cabang_email', '100').notNullable().unique()
      table.string('user_cabang_password', 200).notNullable()
      table.string('user_cabang_telepon', '20')
      table.text('user_cabang_alamat', 'mediumtext')
      table.integer('kantor_cabang_id')
      table.integer('user_role_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_cabangs')
  }
}

module.exports = UserCabangSchema
