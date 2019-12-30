'use strict'

const DataUkur = use('App/Models/DataUkur')
const { validate } = use('Validator')

let rules = {
    data_ukur_data: 'required',
    data_pengamatan_id: 'required',
    sensor_id: 'required'
}

const vmessage = {
    'data_ukur_data.required': 'Data ukur tidak boleh kosong',
    'data_pengamatan_id.required': 'Data pengamatan tidak boleh kosong',
    'sensor_id.required': 'Sensor tidak boleh kosong'
}

class DataUkurController {

    async index({ response }) {
        try {
            let dataUkur = await DataUkur.query()
                .with('dataPengamatan')
                .with('sensor')
                .fetch()

            return response.json(dataUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params }) {
        try {
            let data = await DataUkur.findOrFail(params.id)
            let dataUkur = await DataUkur
                .query()
                .where('data_ukur_id', params.id)
                .with('dataPengamatan')
                .with('sensor')
                .first()

            return dataUkur
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Data ukur tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const dataUkur = new DataUkur()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                data_ukur_data : request.input('data_ukur_data'),
                sensor_id : request.input('sensor_id'),
                data_pengamatan_id: request.input('data_pengamatan_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            dataUkur.data_ukur_data = data.data_ukur_data
            dataUkur.sensor_id = data.sensor_id
            dataUkur.data_pengamatan_id = data.data_pengamatan_id

            await dataUkur.save()
            return response.json(dataUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let dataUkur = await DataUkur.findOrFail(params.id)
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                data_ukur_data : request.input('data_ukur_data'),
                sensor_id : request.input('sensor_id'),
                data_pengamatan_id: request.input('data_pengamatan_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            dataUkur.data_ukur_data = data.data_ukur_data
            dataUkur.sensor_id = data.sensor_id
            dataUkur.data_pengamatan_id = data.data_pengamatan_id

            await dataUkur.save()
            return response.json(dataUkur)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Data ukur tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const dataUkur = await DataUkur.findOrFail(params.id)
            dataUkur.delete()

            return response.json({ message: 'Data ukur berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Data ukur tidak ditemukan'
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
            let column = pagination.column || 'data_ukur_id';
            let sort = pagination.sort || 'desc';

            const dataUkur = await DataUkur.query()
                .with('dataPengamatan')
                .with('sensor')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(dataUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'data_pengamatan_id';
            let value = search.value.toLowerCase();

            let dataUkur = await DataUkur.query()
                .with('dataPengamatan')
                .with('sensor')
                .where(`${column} = '${value}'`)
                .fetch()

            if (dataUkur.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(dataUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = DataUkurController
