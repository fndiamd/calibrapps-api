'use strict'

const StatusPengamatan = use('App/Models/StatusPengamatan')

class StatusPengamatanController {
    
    async index({response}){
        let statusPengamatan = await StatusPengamatan.query().fetch()
        return response.json(statusPengamatan)
    }

    async view({params, response }){
        let statusPengamatan = await StatusPengamatan.query().where('pengamatan_status_id', params.id).first()
        return statusPengamatan
    }  

    async store({response, request}){
        const statusPengamatan = new StatusPengamatan()
        const data = {
            pengamatan_status_keterangan : request.input('pengamatan_status_keterangan'),
            pengamatan_status_warna: request.input('pengamatan_status_warna')
        }

        statusPengamatan.pengamatan_status_keterangan = data.pengamatan_status_keterangan
        statusPengamatan.pengamatan_status_warna = data.pengamatan_status_warna

        await statusPengamatan.save()
        return response.json(statusPengamatan)   
    }

    async update({params, response, request}){
        let statusPengamatan = await StatusPengamatan.find(params.id)
        
        const data = {
          pengamatan_status_keterangan : request.input('pengamatan_status_keterangan'),
          pengamatan_status_warna: request.input('pengamatan_status_warna')
        }

        statusPengamatan.pengamatan_status_keterangan = data.pengamatan_status_keterangan
        statusPengamatan.pengamatan_status_warna = data.pengamatan_status_warna

        await statusPengamatan.save()
        return response.json(statusPengamatan)  
    }

    async delete ({ params, response }) {
      const statusPengamatan = await StatusPengamatan.find(params.id)
      statusPengamatan.delete()
      return response.json({message: 'Pengamatan status berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const statusPengamatan = await StatusPengamatan.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(statusPengamatan)
    }
}

module.exports = StatusPengamatanController
