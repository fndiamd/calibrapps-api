'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnsurKajiUlangSchema extends Schema {
  up () {
    this.create('unsur_kaji_ulangs', (table) => {
      table.integer('unsur_kalibrasi_id').unsigned().references('unsur_kalibrasi_id').inTable('unsur_kalibrasis')
      table.integer('progres_order_id').unsigned().references('progres_order_id').inTable('progres_orders')
      table.timestamps()
    })
  }

  down () {
    this.drop('unsur_kaji_ulangs')
  }
}

module.exports = UnsurKajiUlangSchema
