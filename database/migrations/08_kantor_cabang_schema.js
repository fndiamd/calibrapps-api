'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KantorCabangSchema extends Schema {
  up () {
    this.create('kantor_cabangs', (table) => {
      table.increments('kantor_cabang_id')
      table.string('kantor_cabang_nama', 100).notNullable()
      table.text('kantor_cabang_alamat', 'mediumtext')
      table.string('kantor_cabang_telepon', 20).notNullable()
      table.string('kantor_cabang_fax', 20)
      table.string('kantor_cabang_email', 100).notNullable().unique()
      table.integer('kantor_status_id')
        .unsigned()
        .references('kantor_status_id')
        .inTable('kantor_statuses')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('kantor_cabangs')
  }
}

module.exports = KantorCabangSchema
