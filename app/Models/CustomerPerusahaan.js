'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CustomerPerusahaan extends Model {
    static get primaryKey(){
        return 'customer_perusahaan_id'
    }

    customerStatus(){
        return this.hasOne('App/Models/CustomerStatus')
    }

    userCustomer(){
        return this.hasMany('App/Models/UserCustomer')
    }

    progresOrder(){
        return this.hasMany('App/Models/ProgresOrder')
    }

    tokens () {
        return this.hasMany('App/Models/CustomerToken')
    }
}

module.exports = CustomerPerusahaan
