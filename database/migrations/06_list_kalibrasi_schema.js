'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListKalibrasiSchema extends Schema {
  up() {
    this.create('list_kalibrasis', (table) => {
      table.increments('list_kalibrasi_id')
      table.string('list_kalibrasi_nama_alat', 100).notNullable().unique()
      table.decimal('list_kalibrasi_harga').notNullable()
      table.integer('ruang_lingkup_id')
        .unsigned()
        .references('ruang_lingkup_id')
        .inTable('ruang_lingkups')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('standar_kalibrasi_id')
        .unsigned()
        .references('standar_kalibrasi_id')
        .inTable('standar_kalibrasis')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('tipe_pengerjaan_id')
        .unsigned()
        .references('tipe_pengerjaan_id')
        .inTable('tipe_pengerjaans')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('list_kalibrasis')
  }
}

module.exports = ListKalibrasiSchema
