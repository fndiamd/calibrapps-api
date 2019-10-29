'use strict'

const PenawaranStatus = use('App/Models/PenawaranStatus')

class PenawaranStatusController {
    
    async index({response}){
        let penawaranStatus = await PenawaranStatus.query().fetch()
        return response.json(penawaranStatus)
    }

    async store({response, request}){
        const penawaranStatus = new PenawaranStatus()
        const data = {
            penawaran_status_keterangan : request.input('penawaran_status_keterangan')
        }

        penawaranStatus.penawaran_status_keterangan = data.penawaran_status_keterangan

        await penawaranStatus.save()
        return response.json(penawaranStatus)   
    }

    async update({params, response, request}){
        let penawaranStatus = await PenawaranStatus.find(params.id)
        
        const data = {
          penawaran_status_keterangan : request.input('penawaran_status_keterangan')
        }

        penawaranStatus.penawaran_status_keterangan = data.penawaran_status_keterangan

        await penawaranStatus.save()
        return response.json(penawaranStatus) 
    }

    async delete ({ params, response }) {
      const penawaranStatus = await PenawaranStatus.find(params.id)
      penawaranStatus.delete()
      return response.json({message: 'Penawaran status berhasil dihapus'})
  } 
}

module.exports = PenawaranStatusController
