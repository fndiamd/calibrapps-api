'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerPerusahaanSchema extends Schema {
  up () {
    this.create('customer_perusahaans', (table) => {
      table.increments('customer_perusahaan_id')
      table.string('customer_perusahaan_pkal', 20).notNullable().unique()
      table.string('customer_perusahaan_nama', 150).notNullable()
      table.string('customer_perusahaan_alamat', 'mediumtext')
      table.string('customer_perusahaan_telepon', 20)
      table.string('customer_perusahaan_fax', 20)
      table.integer('customer_status_id').unsigned().references('customer_status_id').inTable('customer_statuses')
      table.timestamps()
    })
  }

  down () {
    this.drop('customer_perusahaans')
  }
}

module.exports = CustomerPerusahaanSchema
