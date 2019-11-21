'use strict'

const RuangLingkup = use('App/Models/RuangLingkup')
const { validate } = use('Validator')

let rules = {
    ruang_lingkup_keterangan: 'required|unique:ruang_lingkups,ruang_lingkup_keterangan'
}

const vmessage = {
    'ruang_lingkup_keterangan.required': 'Ruang lingkup tidak boleh kosong!',
    'ruang_lingkup_keterangan.unique': 'Ruang lingkup sudah ada, tidak boleh duplikat!'
}

class RuangLingkupController {

    async index({ response }) {
        try {
            let ruangLingkup = await RuangLingkup.query().fetch()
            return response.json(ruangLingkup)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let ruangLingkup = await RuangLingkup.findOrFail(params.id)
            return ruangLingkup
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Ruang lingkup tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }


    async store({ response, request }) {
        try {
            const ruangLingkup = new RuangLingkup()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                ruang_lingkup_keterangan: request.input('ruang_lingkup_keterangan')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            ruangLingkup.ruang_lingkup_keterangan = data.ruang_lingkup_keterangan

            await ruangLingkup.save()
            return response.json(ruangLingkup)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let ruangLingkup = await RuangLingkup.findOrFail(params.id)

            const data = {
                ruang_lingkup_keterangan: request.input('ruang_lingkup_keterangan')
            }

            if (ruangLingkup.ruang_lingkup_keterangan === data.ruang_lingkup_keterangan) {
                rules.ruang_lingkup_keterangan = 'required'
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            ruangLingkup.ruang_lingkup_keterangan = data.ruang_lingkup_keterangan

            await ruangLingkup.save()
            return response.json(ruangLingkup)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Ruang lingkup tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const ruangLingkup = await RuangLingkup.findOrFail(params.id)
            ruangLingkup.delete()

            return response.json({ message: 'Ruang lingkup berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Ruang lingkup tidak ditemukan'
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
            let column = pagination.column || 'ruang_lingkup_id';
            let sort = pagination.sort || 'desc';

            const ruangLingkup = await RuangLingkup.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(ruangLingkup)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'ruang_lingkup_keterangan';
            let value = search.value.toLowerCase();

            let ruangLingkup = await RuangLingkup.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (ruangLingkup.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(ruangLingkup)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = RuangLingkupController
