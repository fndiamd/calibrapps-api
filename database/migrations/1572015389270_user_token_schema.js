'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTokenSchema extends Schema {
  up () {
    this.create('user_tokens', (table) => {
      table.increments('user_token_id')
      table.integer('user_cabang_id').unsigned().references('user_cabang_id').inTable('user_cabangs')
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_tokens')
  }
}

module.exports = UserTokenSchema
