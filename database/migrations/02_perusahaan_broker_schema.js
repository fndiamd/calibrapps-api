'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PerusahaanBrokerSchema extends Schema {
  up () {
    this.create('perusahaan_brokers', (table) => {
      table.increments('perusahaan_broker_id')
      table.string('perusahaan_broker_nama', 100).notNullable()
      table.text('perusahaan_broker_alamat', 'mediumtext')
      table.string('perusahaan_broker_telepon', 20).notNullable()
      table.string('perusahaan_broker_fax', 20)
      table.string('perusahaan_broker_email', 100).notNullable().unique()
      table.integer('broker_status_id').unsigned().references('broker_status_id').inTable('broker_statuses')
      table.timestamps()
    })
  }

  down () {
    this.drop('perusahaan_brokers')
  }
}

module.exports = PerusahaanBrokerSchema
