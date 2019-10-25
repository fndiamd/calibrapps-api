'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserCustomer extends Model {
    static get primaryKey(){
        return 'user_customer_id'
    }

    userRole(){
        return this.hasOne('App/Models/CustomerRole')
    }
}

module.exports = UserCustomer
