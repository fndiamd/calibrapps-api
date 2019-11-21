'use strict'

const StandarKalibrasi = use('App/Models/StandarKalibrasi')
const { validate } = use('Validator')

let rules = {
    standar_kalibrasi_keterangan: 'required|unique:standar_kalibrasis,standar_kalibrasi_keterangan'
}

const vmessage = {
    'standar_kalibrasi_keterangan.required': 'Standar kalibrasi tidak boleh kosong!',
    'standar_kalibrasi_keterangan.unique': 'Standar kalibrasi sudah ada, tidak boleh duplikat!'
}

class StandarKalibrasiController {

    async index({ response }) {
        try {
            let standarKalibrasi = await StandarKalibrasi.query().fetch()
            return response.json(standarKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let standarKalibrasi = await StandarKalibrasi.findOrFail(params.id)
            return standarKalibrasi
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Standar kalibrasi tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const standarKalibrasi = new StandarKalibrasi()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                standar_kalibrasi_keterangan: request.input('standar_kalibrasi_keterangan')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            standarKalibrasi.standar_kalibrasi_keterangan = data.standar_kalibrasi_keterangan

            await standarKalibrasi.save()
            return response.json(standarKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let standarKalibrasi = await StandarKalibrasi.findOrFail(params.id)

            const data = {
                standar_kalibrasi_keterangan: request.input('standar_kalibrasi_keterangan')
            }

            if (standarKalibrasi.standar_kalibrasi_keterangan === data.standar_kalibrasi_keterangan) {
                rules.standar_kalibrasi_keterangan = 'required'
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            standarKalibrasi.standar_kalibrasi_keterangan = data.standar_kalibrasi_keterangan

            await standarKalibrasi.save()
            return response.json(standarKalibrasi)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Standar kalibrasi tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const standarKalibrasi = await StandarKalibrasi.findOrFail(params.id)
            standarKalibrasi.delete()

            return response.json({ message: 'Standar Kalibrasi berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Standar kalibrasi tidak ditemukan'
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
            let column = pagination.column || 'standar_kalibrasi_id';
            let sort = pagination.sort || 'desc';

            const standarKalibrasi = await StandarKalibrasi.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(standarKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'standar_kalibrasi_keterangan';
            let value = search.value.toLowerCase();

            let standarKalibrasi = await StandarKalibrasi.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (standarKalibrasi.rows.lengt == 0) { 
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(standarKalibrasi)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = StandarKalibrasiController
