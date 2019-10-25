'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RuangLingkupSchema extends Schema {
  up () {
    this.create('ruang_lingkups', (table) => {
      table.increments('ruang_lingkup_id')
      table.string('ruang_lingkup_keterangan', 100).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('ruang_lingkups')
  }
}

module.exports = RuangLingkupSchema
