'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipePengerjaanSchema extends Schema {
  up () {
    this.create('tipe_pengerjaans', (table) => {
      table.increments('tipe_pengerjaan_id')
      table.string('tipe_pengerjaan_keterangan', 100).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('tipe_pengerjaans')
  }
}

module.exports = TipePengerjaanSchema
