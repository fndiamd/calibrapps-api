'use strict'

const Sensor = use('App/Models/Sensor')

class SensorController {
    
    async index({response}){
        let sensor = await Sensor.query().fetch()
        return response.json(sensor)
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
}

module.exports = SensorController
