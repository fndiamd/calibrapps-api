'use strict'

const TipePengerjaan = use('App/Models/TipePengerjaan')

class TipePengerjaanController {
    
    async index({response}){
        let tipePengerjaan = await TipePengerjaan.query().fetch()
        return response.json(tipePengerjaan)
    }

    async view({params, response }){
        let tipePengerjaan = await TipePengerjaan.query().where('tipe_pengerjaan_id', params.id).first()
        return tipePengerjaan
    }  

    async store({response, request}){
        const tipePengerjaan = new TipePengerjaan()
        const data = {
            tipe_pengerjaan_keterangan : request.input('tipe_pengerjaan_keterangan')
        }

        tipePengerjaan.tipe_pengerjaan_keterangan = data.tipe_pengerjaan_keterangan

        await tipePengerjaan.save()
        return response.json(tipePengerjaan)   
    }

    async update({params, response, request}){
        let tipePengerjaan = await TipePengerjaan.find(params.id)
        
        const data = {
          tipe_pengerjaan_keterangan : request.input('tipe_pengerjaan_keterangan')
        }

        tipePengerjaan.tipe_pengerjaan_keterangan = data.tipe_pengerjaan_keterangan

        await tipePengerjaan.save()
        return response.json(tipePengerjaan)    
    }

    async delete ({ params, response }) {
      const tipePengerjaan = await TipePengerjaan.find(params.id)
      tipePengerjaan.delete()
      return response.json({message: 'Tipe pengerjaan berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const tipePengerjaan = await TipePengerjaan.query()
        .paginate(page, limit)
        return response.json(tipePengerjaan)
    }
}

module.exports = TipePengerjaanController
