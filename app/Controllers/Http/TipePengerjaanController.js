'use strict'

const TipePengerjaan = use('App/Models/TipePengerjaan')
const { validate } = use('Validator')

let rules = {
    tipe_pengerjaan_keterangan: 'required|unique:tipe_pengerjaans,tipe_pengerjaan_keterangan'
}

const vmessage = {
    'tipe_pengerjaan_keterangan.required': 'Tipe pengerjaan tidak boleh kosong!',
    'tipe_pengerjaan_keterangan.unique': 'Tipe pengerjaan user sudah ada, tidak boleh duplikat!'
}

class TipePengerjaanController {

    async index({ response }) {
        try {
            let tipePengerjaan = await TipePengerjaan.query().fetch()
            return response.json(tipePengerjaan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let tipePengerjaan = await TipePengerjaan.findOrFail(params.id)
            return tipePengerjaan
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Tipe pengerjaan tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const tipePengerjaan = new TipePengerjaan()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                tipe_pengerjaan_keterangan: request.input('tipe_pengerjaan_keterangan')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            tipePengerjaan.tipe_pengerjaan_keterangan = data.tipe_pengerjaan_keterangan

            await tipePengerjaan.save()
            return response.json(tipePengerjaan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let tipePengerjaan = await TipePengerjaan.findOrFail(params.id)

            const data = {
                tipe_pengerjaan_keterangan: request.input('tipe_pengerjaan_keterangan')
            }

            if (tipePengerjaan.tipe_pengerjaan_keterangan === data.tipe_pengerjaan_keterangan) {
                rules.tipe_pengerjaan_keterangan = 'required'
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            tipePengerjaan.tipe_pengerjaan_keterangan = data.tipe_pengerjaan_keterangan

            await tipePengerjaan.save()
            return response.json(tipePengerjaan)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Tipe pengerjaan tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const tipePengerjaan = await TipePengerjaan.findOrFail(params.id)
            tipePengerjaan.delete()

            return response.json({ message: 'Tipe pengerjaan berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Tipe pengerjaan tidak ditemukan'
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
            let column = pagination.column || 'tipe_pengerjaan_id';
            let sort = pagination.sort || 'desc';

            const tipePengerjaan = await TipePengerjaan.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(tipePengerjaan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'tipe_pengerjaan_keterangan';
            let value = search.value.toLowerCase();

            let tipePengerjaan = await TipePengerjaan.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(tipePengerjaan.rows.length == 0){
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(tipePengerjaan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = TipePengerjaanController
