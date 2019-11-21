'use strict'

const Sensor = use('App/Models/Sensor')

class SensorController {

    async index({ response }) {
        try {
            let sensor = await Sensor.query().fetch()
            return response.json(sensor)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let sensor = await Sensor.findOrFail(params.id)
            return sensor
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Sensor tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }


    async store({ response, request }) {
        try {
            const sensor = new Sensor()
            const data = {
                sensor_nama: request.input('sensor_nama')
            }

            sensor.sensor_nama = data.sensor_nama

            await sensor.save()
            return response.json(sensor)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let sensor = await Sensor.findOrFail(params.id)

            const data = {
                sensor_nama: request.input('sensor_nama')
            }

            sensor.sensor_nama = data.sensor_nama

            await sensor.save()
            return response.json(sensor)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Sensor tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const sensor = await Sensor.findOrFail(params.id)
            sensor.delete()

            return response.json({ message: 'Sensor berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Sensor tidak ditemukan'
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
            let column = pagination.column || 'sensor_id';
            let sort = pagination.sort || 'desc';

            const sensor = await Sensor.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(sensor)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'sensor_nama';
            let value = search.value.toLowerCase();

            let sensor = await Sensor.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (sensor.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(sensor)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = SensorController
