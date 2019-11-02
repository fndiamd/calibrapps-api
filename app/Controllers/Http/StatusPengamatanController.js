'use strict'

const StatusPengamatan = use('App/Models/StatusPengamatan')

class StatusPengamatanController {
    
    async index({response}){
        let statusPengamatan = await StatusPengamatan.query().fetch()
        return response.json(statusPengamatan)
    }

    async view({params, response }){
        let statusPengamatan = await StatusPengamatan.query().where('status_pengamatan_id', params.id).first()
        return statusPengamatan
    }  

    async store({response, request}){
        const statusPengamatan = new StatusPengamatan()
        const data = {
            status_pengamatan_keterangan : request.input('status_pengamatan_keterangan')
        }

        statusPengamatan.status_pengamatan_keterangan = data.status_pengamatan_keterangan

        await statusPengamatan.save()
        return response.json(statusPengamatan)   
    }

    async update({params, response, request}){
        let statusPengamatan = await StatusPengamatan.find(params.id)
        
        const data = {
          status_pengamatan_keterangan : request.input('status_pengamatan_keterangan')
        }

        statusPengamatan.status_pengamatan_keterangan = data.status_pengamatan_keterangan

        await statusPengamatan.save()
        return response.json(statusPengamatan)  
    }

    async delete ({ params, response }) {
      const statusPengamatan = await StatusPengamatan.find(params.id)
      statusPengamatan.delete()
      return response.json({message: 'Status pengamatan berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const statusPengamatan = await StatusPengamatan.query()
        .paginate(page, limit)
        return response.json(statusPengamatan)
    }
}

module.exports = StatusPengamatanController
