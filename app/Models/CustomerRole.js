'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CustomerRole extends Model {
    static get primaryKey(){
        return 'customer_role_id'
    }

    userCustomer(){
        return this.hasMany('App/Models/UserCustomer')
    }
}

module.exports = CustomerRole
