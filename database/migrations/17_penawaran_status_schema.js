'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PenawaranStatusSchema extends Schema {
  up () {
    this.create('penawaran_statuses', (table) => {
      table.increments('penawaran_status_id')
      table.string('penawaran_status_keterangan', 100).notNullable().unique()
      table.string('penawaran_status_warna', 50).unique()
      //table.timestamps()
    })
  }

  down () {
    this.drop('penawaran_statuses')
  }
}

module.exports = PenawaranStatusSchema
