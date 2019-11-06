'use strict'

const UnsurKajiUlang = use('App/Models/UnsurKajiUlang')

class UnsurKajiUlangController {
    
    async index({response}){
        let unsurKajiUlang = await UnsurKajiUlang.query()
        .with('unsurKalibrasi')
        .with('progresOrder')
        .fetch()
        return response.json(unsurKajiUlang)
    }

    async view({params, response }){
        let unsurKajiUlang = await UnsurKajiUlang.query().where('progres_order_id', params.id)
        .with('unsurKalibrasi')
        .fetch()
        return unsurKajiUlang
    }

    async store({response, request}){
        const unsurKajiUlang = new UnsurKajiUlang()
        const data = {
            progres_order_id : request.input('progres_order_id')
        }

        unsurKajiUlang.progres_order_id = data.progres_order_id

        await unsurKajiUlang.save()
        return response.json(unsurKajiUlang)   
    }

    async update({params, response, request}){
        let unsurKajiUlang = await UnsurKajiUlang.find(params.id)
        
        const data = {
          progres_order_id : request.input('progres_order_id')
        }

        unsurKajiUlang.progres_order_id = data.progres_order_id

        await unsurKajiUlang.save()
        return response.json(unsurKajiUlang)
    }

    async delete ({ params, response }) {
      const unsurKajiUlang = await UnsurKajiUlang.find(params.id)
      unsurKajiUlang.delete()
      return response.json({message: 'Unsur kaji ulang berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const unsurKajiUlang = await UnsurKajiUlang.query()
        .with('unsurKalibrasi')
        .with('progresOrder')
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(unsurKajiUlang)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])

        let unsurKajiUlang = await UnsurKajiUlang.query()
        .with('unsurKalibrasi')
        .with('progresOrder')
        .whereRaw(`${search.column} LIKE '%${search.value.toLowerCase()}%'`)
        .fetch()
        return response.json(unsurKajiUlang)
    }
}

module.exports = UnsurKajiUlangController
