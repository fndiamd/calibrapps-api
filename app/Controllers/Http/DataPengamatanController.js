'use strict'

const DataPengamatan = use('App/Models/DataPengamatan')

class DataPengamatanController {
    
    async index({response}){
        let dataPengamatan = await DataPengamatan.query().fetch()
        return response.json(dataPengamatan)
    }

    async store({response, request}){
        const dataPengamatan = new DataPengamatan()
        const data = {
            sensor_id : request.input('sensor_id'),
            status_pengamatan_id : request.input('status_pengamatan_id'),
            user_cabang_id : request.input('user_cabang_id')
        }

        dataPengamatan.sensor_id = data.sensor_id
        dataPengamatan.status_pengamatan_id = data.status_pengamatan_id
        dataPengamatan.user_cabang_id = data.user_cabang_id

        await dataPengamatan.save()
        return response.json(dataPengamatan)   
    }

    async update({params, response, request}){
        let dataPengamatan = await DataPengamatan.find(params.id)
        
        const data = {
          sensor_id : request.input('sensor_id'),
          status_pengamatan_id : request.input('status_pengamatan_id'),
          user_cabang_id : request.input('user_cabang_id')
        }

        dataPengamatan.sensor_id = data.sensor_id
        dataPengamatan.status_pengamatan_id = data.status_pengamatan_id
        dataPengamatan.user_cabang_id = data.user_cabang_id

        await dataPengamatan.save()
        return response.json(dataPengamatan)
    }

    async delete ({ params, response }) {
      const dataPengamatan = await DataPengamatan.find(params.id)
      dataPengamatan.delete()
      return response.json({message: 'Data pengamatan berhasil dihapus'})
  } 
}

module.exports = DataPengamatanController
