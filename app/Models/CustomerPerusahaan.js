'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CustomerPerusahaan extends Model {

    static get primaryKey(){
        return 'customer_perusahaan_id'
    }

    statusPerusahaan(){
        return this.hasOne('App/Model/CustomerStatus')
    }
}

module.exports = CustomerPerusahaan
