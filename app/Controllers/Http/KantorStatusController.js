'use strict'

const KantorStatus = use('App/Models/KantorStatus')

class KantorStatusController {
    
    async index({response}){
        let kantorStatus = await KantorStatus.query().fetch()
        return response.json(kantorStatus)
    }

    async view({params, response }){
        let kantorStatus = await KantorStatus.query().where('kantor_status_id', params.id).first()
        return kantorStatus
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

    async delete ({ params, response }) {
      const kantorStatus = await KantorStatus.find(params.id)
      kantorStatus.delete()
      return response.json({message: 'Kantor status berhasil dihapus'})
    } 

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const kantorStatus = await KantorStatus.query()
        .paginate(page, limit)
        return response.json(kantorStatus)
    }

}

module.exports = KantorStatusController
