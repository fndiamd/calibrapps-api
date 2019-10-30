'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class UserCustomer extends Model {
    static boot(){
        super.boot();
        this.addHook('beforeSave', async (userInstance) => {
            userInstance.user_customer_password = await Hash.make(userInstance.user_customer_password) 
        })
    }

    static get primaryKey(){
        return 'user_customer_id'
    }

    customerRole(){
        return this.belongsTo("App/Models/CustomerRole")
    }

    customerPerusahaan(){
        return this.belongsTo('App/Models/CustomerPerusahaan')
    }

    tokens () {
        return this.hasMany('App/Models/CustomerToken')
    }
}

module.exports = UserCustomer
