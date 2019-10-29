'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CustomerToken extends Model {
    static get primaryKey(){
        return 'customer_token_id'
    }

    userCustomer(){
        return this.belongsTo('App/Models/UserCustomer')
    }
}

module.exports = CustomerToken
