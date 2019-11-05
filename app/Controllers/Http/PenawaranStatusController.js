'use strict'

const PenawaranStatus = use('App/Models/PenawaranStatus')

class PenawaranStatusController {
    
    async index({response}){
        let penawaranStatus = await PenawaranStatus.query().fetch()
        return response.json(penawaranStatus)
    }

    async view({params, response }){
        let penawaranStatus = await PenawaranStatus.query().where('penawaran_status_id', params.id).first()
        return penawaranStatus
    }

    async store({response, request}){
        const penawaranStatus = new PenawaranStatus()
        const data = {
            penawaran_status_keterangan : request.input('penawaran_status_keterangan'),
            penawaran_status_warna: request.input('penawaran_status_warna')
        }

        penawaranStatus.penawaran_status_keterangan = data.penawaran_status_keterangan
        penawaranStatus.penawaran_status_warna = data.penawaran_status_warna

        await penawaranStatus.save()
        return response.json(penawaranStatus)   
    }

    async update({params, response, request}){
        let penawaranStatus = await PenawaranStatus.find(params.id)
        
        const data = {
          penawaran_status_keterangan : request.input('penawaran_status_keterangan'),
          penawaran_status_warna: request.input('penawaran_status_warna')
        }

        penawaranStatus.penawaran_status_keterangan = data.penawaran_status_keterangan
        penawaranStatus.penawaran_status_warna = data.penawaran_status_warna

        await penawaranStatus.save()
        return response.json(penawaranStatus) 
    }

    async delete ({ params, response }) {
      const penawaranStatus = await PenawaranStatus.find(params.id)
      penawaranStatus.delete()
      return response.json({message: 'Penawaran status berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const penawaranStatus = await PenawaranStatus.query()
        .paginate(page, limit)
        return response.json(penawaranStatus)
    }
}

module.exports = PenawaranStatusController
