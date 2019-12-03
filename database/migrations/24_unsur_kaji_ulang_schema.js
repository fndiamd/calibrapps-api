'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnsurKajiUlangSchema extends Schema {
  up() {
    this.create('unsur_kaji_ulangs', (table) => {
      table.integer('unsur_kalibrasi_id')
        .notNullable()
        .unsigned()
        .references('unsur_kalibrasi_id')
        .inTable('unsur_kalibrasis')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('progres_order_id')
        .notNullable()
        .unsigned()
        .references('progres_order_id')
        .inTable('progres_orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('unsur_kaji_ulangs')
  }
}

module.exports = UnsurKajiUlangSchema
