'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

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
        return this.hasOne(App/Models/CustomerRole)
    }

    customerPerusahaan(){
        return this.hasOne('App/Models/CustomerPerusahaan')
    }
}

module.exports = UserCustomer
