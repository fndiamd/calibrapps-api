'use strict'

const StandarKalibrasi = use('App/Models/StandarKalibrasi')

class StandarKalibrasiController {
    
    async index({response}){
        let standarKalibrasi = await StandarKalibrasi.query().fetch()
        return response.json(standarKalibrasi)
    }

    async view({params, response }){
        let standarKalibrasi = await StandarKalibrasi.query().where('standar_kalibrasi_id', params.id).first()
        return standarKalibrasi
    }  

    async store({response, request}){
        const standarKalibrasi = new StandarKalibrasi()
        const data = {
            standar_kalibrasi_keterangan : request.input('standar_kalibrasi_keterangan')
        }

        standarKalibrasi.standar_kalibrasi_keterangan = data.standar_kalibrasi_keterangan

        await standarKalibrasi.save()
        return response.json(standarKalibrasi)   
    }

    async update({params, response, request}){
        let standarKalibrasi = await StandarKalibrasi.find(params.id)
        
        const data = {
          standar_kalibrasi_keterangan : request.input('standar_kalibrasi_keterangan')
        }

        standarKalibrasi.standar_kalibrasi_keterangan = data.standar_kalibrasi_keterangan

        await standarKalibrasi.save()
        return response.json(standarKalibrasi)   
    }

    async delete ({ params, response }) {
      const standarKalibrasi = await StandarKalibrasi.find(params.id)
      standarKalibrasi.delete()
      return response.json({message: 'Standar Kalibrasi berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const standarKalibrasi = await StandarKalibrasi.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(standarKalibrasi)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])

        let standarKalibrasi = await StandarKalibrasi.query()
        .whereRaw(`${search.column} LIKE '%${search.value.toLowerCase()}%'`)
        .fetch()
        return response.json(standarKalibrasi)
    }
}

module.exports = StandarKalibrasiController
