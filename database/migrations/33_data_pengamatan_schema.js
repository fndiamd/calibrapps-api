'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DataPengamatanSchema extends Schema {
  up() {
    this.create('data_pengamatans', (table) => {
      table.increments('data_pengamatan_id')
      table.integer('sensor_id')
        .unsigned()
        .references('sensor_id')
        .inTable('sensors')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('pengamatan_status_id')
        .unsigned()
        .references('pengamatan_status_id')
        .inTable('pengamatan_statuses')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('user_cabang_id')
        .unsigned()
        .references('user_cabang_id')
        .inTable('user_cabangs')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('data_pengamatans')
  }
}

module.exports = DataPengamatanSchema
