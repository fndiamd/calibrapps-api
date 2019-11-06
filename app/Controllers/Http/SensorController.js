'use strict'

const Sensor = use('App/Models/Sensor')

class SensorController {
    
    async index({response}){
        let sensor = await Sensor.query().fetch()
        return response.json(sensor)
    }

    async view({params, response }){
        let sensor = await Sensor.query().where('sensor_id', params.id).first()
        return sensor
    }
  

    async store({response, request}){
        const sensor = new Sensor()
        const data = {
            sensor_nama : request.input('sensor_nama')
        }

        sensor.sensor_nama = data.sensor_nama

        await sensor.save()
        return response.json(sensor)   
    }

    async update({params, response, request}){
        let sensor = await Sensor.find(params.id)
        
        const data = {
          sensor_nama : request.input('sensor_nama')
      }

      sensor.sensor_nama = data.sensor_nama

      await sensor.save()
      return response.json(sensor) 
    }

    async delete ({ params, response }) {
      const sensor = await Sensor.find(params.id)
      sensor.delete()
      return response.json({message: 'Sensor berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const sensor = await Sensor.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(sensor)
    }
}

module.exports = SensorController
