'use strict'

const TipePengerjaan = use('App/Models/TipePengerjaan')

class TipePengerjaanController {
    
    async index({response}){
        let tipePengerjaan = await TipePengerjaan.query().fetch()
        return response.json(tipePengerjaan)
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

    async destroy ({ params, request, response }) {
      await TipePengerjaan.find(params.id).delete()
      return response.json({message: 'Tipe pengerjaan berhasil dihapus'})
  } 
}

module.exports = TipePengerjaanController
