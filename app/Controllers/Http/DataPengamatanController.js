'use strict'

const DataPengamatan = use('App/Models/DataPengamatan')
const { validate } = use('Validator')

let rules = {
    sensor_id: 'required',
    status_pengamatan_id: 'required',
    user_cabang_id: 'required'
}

const vmessage = {
    'sensor_id.required': 'Sensor tidak boleh kosong',
    'status_pengamatan_id.required': 'Status pengamatan tidak boleh kosong',
    'user_cabang_id.required': 'User cabang tidak boleh kosong'
}

class DataPengamatanController {
    async index({ response }) {
        try {
            let dataPengamatan = await DataPengamatan.query()
                .with('sensor')
                .with('statusPengamatan')
                .with('userCabang')
                .fetch()

            return response.json(dataPengamatan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params }) {
        try {
            let data = await DataPengamatan.findOrFail(params.id)
            let dataPengamatan = await DataPengamatan
                .query()
                .where('data_pengamatan_id', params.id)
                .with('sensor')
                .with('statusPengamatan')
                .with('userCabang')
                .first()

            return dataPengamatan
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Data pengamatan tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const dataPengamatan = new DataPengamatan()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                sensor_id: request.input('sensor_id'),
                status_pengamatan_id: request.input('pengamatan_status_id'),
                user_cabang_id: request.input('user_cabang_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            dataPengamatan.sensor_id = data.sensor_id
            dataPengamatan.pengamatan_status_id = data.status_pengamatan_id
            dataPengamatan.user_cabang_id = data.user_cabang_id

            await dataPengamatan.save()
            return response.json(dataPengamatan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            const dataPengamatan = await DataPengamatan.find(params.id)
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                sensor_id: request.input('sensor_id'),
                status_pengamatan_id: request.input('pengamatan_status_id'),
                user_cabang_id: request.input('user_cabang_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            dataPengamatan.sensor_id = data.sensor_id
            dataPengamatan.pengamatan_status_id = data.status_pengamatan_id
            dataPengamatan.user_cabang_id = data.user_cabang_id

            await dataPengamatan.save()
            return response.json(dataPengamatan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const dataPengamatan = await DataPengamatan.findOrFail(params.id)
            dataPengamatan.delete()

            return response.json({ message: 'Data pengamatan berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Data pengamatan tidak ditemukan'
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
            let column = pagination.column || 'data_pengamatan_id';
            let sort = pagination.sort || 'desc';

            const dataPengamatan = await DataPengamatan.query()
                .with('sensor')
                .with('statusPengamatan')
                .with('userCabang')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(dataPengamatan)
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
            let value = search.value

            let dataPengamatan = await DataPengamatan.query()
                .with('sensor')
                .with('statusPengamatan')
                .with('userCabang')
                .whereRaw(`${column} LIKE '%${value}%'`)
                .fetch()

            if(dataPengamatan.rows.length == 0){
                return response.status(404).send({
                    message : 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(dataPengamatan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = DataPengamatanController
