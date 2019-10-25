'use strict'

const KantorStatus = use('App/Models/KantorStatus')

class KantorStatusController {
    
    async index({response}){
        let kantorStatus = await KantorStatus.query().fetch()
        return response.json(kantorStatus)
    }

    async store({response, request}){
        const kantorStatus = new KantorStatus()
        const data = {
            kantor_status_keterangan : request.input('kantor_status_keterangan')
        }

        kantorStatus.kantor_status_keterangan = data.kantor_status_keterangan

        await kantorStatus.save()
        return response.json(kantorStatus)   
    }

    async update({params, response, request}){
        let kantorStatus = await KantorStatus.find(params.id)
        
        const data = {
          kantor_status_keterangan : request.input('kantor_status_keterangan')
        }

        kantorStatus.kantor_status_keterangan = data.kantor_status_keterangan

        await kantorStatus.save()
        return response.json(kantorStatus)    
    }

    async destroy ({ params, request, response }) {
      await KantorStatus.find(params.id).delete()
      return response.json({message: 'Kantor status berhasil dihapus'})
  } 
}

module.exports = KantorStatusController
