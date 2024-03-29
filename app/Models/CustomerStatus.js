'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CustomerStatus extends Model {
    static get primaryKey(){
        return 'customer_status_id'
    }

    static get createdAtColumn(){
        return null
    }

    static get updatedAtColumn(){
        return null
    }
    
    customerPerusahaan(){
        return this.hasMany('App/Models/CustomerPerusahaan')
    }
}

module.exports = CustomerStatus
