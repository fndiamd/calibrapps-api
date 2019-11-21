'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PenawaranOrder extends Model {
    static get primaryKey(){
        return 'penawaran_order_id'
    }

    static get dates(){
        return super.dates.concat(['penawaran_order_tanggal_penawaran'])
    }

    static formatDates(field, value){
        if(field === 'penawaran_order_tanggal_penawaran'){
            return value.format('YYYY-MM-DD')
        }
        return super.formatDates(field, value)
    }

    penawaranStatus(){
        return this.belongsTo('App/Models/PenawaranStatus')
    }

    progresOrder(){
        return this.hasOne('App/Models/ProgresOrder')
    }
}

module.exports = PenawaranOrder
