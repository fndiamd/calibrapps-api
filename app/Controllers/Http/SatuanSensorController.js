'use strict'

const SatuanSensor = use('App/Models/SatuanSensor')

class SatuanSensorController {

  async index({ response }) {
    try {
      let satuanSensor = await SatuanSensor
        .query()
        .with('sensor')
        .fetch()
      return response.json(satuanSensor)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async view({ params, response }) {
    try {
      let satuan = await SatuanSensor.findOrFail()
      let satuanSensor = await SatuanSensor
        .query()
        .where('satuan_sensor_id', params.id)
        .with('sensor')
        .first()

      return satuanSensor
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send({
          message: 'Satuan sensor tidak ditemukan'
        })
      }

      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async store({ response, request }) {
    try {
      const satuanSensor = new SatuanSensor()
      const data = {
        satuan_sensor_satuan: request.input('satuan_sensor_satuan'),
        satuan_sensor_rentang_min: request.input('satuan_sensor_rentang_min'),
        satuan_sensor_rentang_max = request.input('satuan_sensor_rentang_max'),
        sensor_id: request.input('sensor_id')
      }

      satuanSensor.satuan_sensor_satuan = data.satuan_sensor_satuan
      satuanSensor.satuan_sensor_rentang_min = data.satuan_sensor_rentang_min
      satuanSensor.satuan_sensor_rentang_max = data.satuan_sensor_rentang_max
      satuanSensor.sensor_id = data.sensor_id

      await satuanSensor.save()
      return response.json(satuanSensor)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async update({ params, response, request }) {
    try {
      let satuanSensor = await SatuanSensor.findOrFail(params.id)

      const data = {
        satuan_sensor_satuan: request.input('satuan_sensor_satuan'),
        satuan_sensor_rentang_min: request.input('satuan_sensor_rentang_min'),
        satuan_sensor_rentang_max = request.input('satuan_sensor_rentang_max'),
        sensor_id: request.input('sensor_id')
      }

      satuanSensor.satuan_sensor_satuan = data.satuan_sensor_satuan
      satuanSensor.satuan_sensor_rentang_min = data.satuan_sensor_rentang_min
      satuanSensor.satuan_sensor_rentang_max = data.satuan_sensor_rentang_max
      satuanSensor.sensor_id = data.sensor_id

      await satuanSensor.save()
      return response.json(satuanSensor)
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send({
          message: 'Satuan sensor tidak ditemukan'
        })
      }

      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async delete({ params, response }) {
    try {
      const satuanSensor = await SatuanSensor.findOrFail(params.id)
      satuanSensor.delete()
      return response.json({ message: 'Satuan sensor berhasil dihapus' })
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send({
          message: 'Satuan sensor tidak ditemukan'
        })
      }

      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async pagination({ request, response }) {
    try {
      let pagination = request.only(['page', 'limit', 'column', 'sort'])
      let page = pagination.page || 1;
      let limit = pagination.limit || 10;
      let column = pagination.column || 'satuan_sensor_id';
      let sort = pagination.sort || 'desc';

      const satuanSensor = await SatuanSensor.query()
        .with('sensor')
        .orderBy(`${column}`, `${sort}`)
        .paginate(page, limit)

      return response.json(satuanSensor)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async search({ request, response }) {
    try {
      let search = request.only(['column', 'value'])
      let column = search.column || 'satuan_sensor_satuan';
      let value = search.value.toLowerCase();

      let satuanSensor = await SatuanSensor.query()
        .with('sensor')
        .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
        .fetch()

      if(satuanSensor.rows.length == 0){
        return response.status(404).send({
          message: 'Pencarian untuk ' + value + ' tidak ditemukan'
        })
      }

      return response.json(satuanSensor)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }
}

module.exports = SatuanSensorController
