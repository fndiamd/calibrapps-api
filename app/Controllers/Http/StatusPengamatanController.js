'use strict'

const StatusPengamatan = use('App/Models/StatusPengamatan')

class StatusPengamatanController {
    
    async index({response}){
        let statusPengamatan = await StatusPengamatan.query().fetch()
        return response.json(statusPengamatan)
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

    async destroy ({ params, request, response }) {
      await StatusPengamatan.find(params.id).delete()
      return response.json({message: 'Status pengamatan berhasil dihapus'})
  } 
}

module.exports = StatusPengamatanController
