'use strict'

const SatuanSensor = use('App/Models/SatuanSensor')

class SatuanSensorController {
    
    async index({response}){
        let satuanSensor = await SatuanSensor.query()
        .with('sensor')
        .fetch()
        return response.json(satuanSensor)
    }

    async view({params, response }){
      let satuanSensor = await SatuanSensor.query().where('satuan_sensor_id', params.id)
      .with('sensor')
      .first()
      return satuanSensor
    }

    async store({response, request}){
        const satuanSensor = new SatuanSensor()
        const data = {
            satuan_sensor_satuan : request.input('satuan_sensor_satuan'),
            satuan_sensor_rentang_min : request.input('satuan_sensor_rentang_min'),
            satuan_sensor_rentang_max = request.input('satuan_sensor_rentang_max'),
            sensor_id : request.input('sensor_id')
          }

          satuanSensor.satuan_sensor_satuan = data.satuan_sensor_satuan
          satuanSensor.satuan_sensor_rentang_min = data.satuan_sensor_rentang_min
          satuanSensor.satuan_sensor_rentang_max = data.satuan_sensor_rentang_max
          satuanSensor.sensor_id = data.sensor_id

          await satuanSensor.save()
          return response.json(satuanSensor)   
    }

    async update({params, response, request}){
        let satuanSensor = await SatuanSensor.find(params.id)
        
        const data = {
          satuan_sensor_satuan : request.input('satuan_sensor_satuan'),
          satuan_sensor_rentang_min : request.input('satuan_sensor_rentang_min'),
          satuan_sensor_rentang_max = request.input('satuan_sensor_rentang_max'),
          sensor_id : request.input('sensor_id')
        }

        satuanSensor.satuan_sensor_satuan = data.satuan_sensor_satuan
        satuanSensor.satuan_sensor_rentang_min = data.satuan_sensor_rentang_min
        satuanSensor.satuan_sensor_rentang_max = data.satuan_sensor_rentang_max
        satuanSensor.sensor_id = data.sensor_id

        await satuanSensor.save()
        return response.json(satuanSensor)    
    }

    async delete ({ params, response }) {
      const satuanSensor = await SatuanSensor.find(params.id)
      satuanSensor.delete()
      return response.json({message: 'Satuan sensor berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
      let pagination = request.only(['page', 'limit', 'column', 'sort'])
      let page = pagination.page || 1;
      let limit = pagination.limit || 10;
      const satuanSensor = await SatuanSensor.query()
      .with('sensor')
      .orderBy(`${pagination.column}`, `${pagination.sort}`)
      .paginate(page, limit)
      return response.json(satuanSensor)
  }
}

module.exports = SatuanSensorController
