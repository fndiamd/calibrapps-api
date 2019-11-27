'use strict'

const DataUkur = use('App/Models/DataUkur')
const { validate } = use('Validator')

let rules = {
    data_ukur_setting_point: 'required',
    data_pengamatan_id: 'required',
    barang_kalibrasi_id: 'required'
}

const vmessage = {
    'data_ukur_setting_point.required': 'Setting point tidak boleh kosong',
    'data_pengamatan_id.required': 'Data pengamatan tidak boleh kosong',
    'barang_kalibrasi_id.required': 'Barang kalibrasi tidak boleh kosong'
}

class DataUkurController {

    async index({ response }) {
        try {
            let dataUkur = await DataUkur.query()
                .with('dataPengamatan')
                .with('barangKalibrasi')
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
                .with('barangKalibrasi')
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
                data_ukur_setting_point: request.input('data_ukur_setting_point'),
                data_pengamatan_id: request.input('data_pengamatan_id'),
                barang_kalibrasi_id: request.input('barang_kalibrasi_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            dataUkur.data_ukur_setting_point = data.data_ukur_setting_point
            dataUkur.data_pengamatan_id = data.data_pengamatan_id
            dataUkur.barang_kalibrasi_id = data.barang_kalibrasi_id

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
                data_ukur_setting_point: request.input('data_ukur_setting_point'),
                data_pengamatan_id: request.input('data_pengamatan_id'),
                barang_kalibrasi_id: request.input('barang_kalibrasi_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            dataUkur.data_ukur_setting_point = data.data_ukur_setting_point
            dataUkur.data_pengamatan_id = data.data_pengamatan_id
            dataUkur.barang_kalibrasi_id = data.barang_kalibrasi_id

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
                .with('barangKalibrasi')
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
            let column = search.column || 'data_ukur_setting_point';
            let value = search.value.toLowerCase();

            let dataUkur = await DataUkur.query()
                .with('dataPengamatan')
                .with('barangKalibrasi')
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
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
