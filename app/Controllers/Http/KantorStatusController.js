'use strict'

const KantorStatus = use('App/Models/KantorStatus')
const { validate } = use('Validator')

let rules = {
    kantor_status_keterangan: 'required|unique:kantor_statuses,kantor_status_keterangan',
    kantor_status_warna: 'required|unique:kantor_statuses,kantor_status_warna'
}

const vmessage = {
    'kantor_status_keterangan.required': 'Status tidak boleh kosong',
    'kantor_status_keterangan.unique': 'Status sudah ada, tidak boleh duplikat',
    'kantor_status_warna.required': 'Warna status tidak boleh kosong',
    'kantor_status_warna.unique': 'Warna sudah dipakai, tidak boleh duplikat'
}

class KantorStatusController {

    async index({ response }) {
        try {
            let kantorStatus = await KantorStatus.query().fetch()

            return response.json(kantorStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let kantorStatus = await KantorStatus.findOrFail(params.id)

            return kantorStatus
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status kantor tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const kantorStatus = new KantorStatus()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                kantor_status_keterangan: request.input('kantor_status_keterangan'),
                kantor_status_warna: request.input('kantor_status_warna')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            kantorStatus.kantor_status_keterangan = data.kantor_status_keterangan
            kantorStatus.kantor_status_warna = data.kantor_status_warna

            await kantorStatus.save()
            return response.json(kantorStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let kantorStatus = await KantorStatus.findOrFail(params.id)

            const data = {
                kantor_status_keterangan: request.input('kantor_status_keterangan'),
                kantor_status_warna: request.input('kantor_status_warna')
            }

            if (kantorStatus.kantor_status_keterangan === data.kantor_status_keterangan ||
                kantorStatus.kantor_status_warna === data.kantor_status_warna) {
                rules = {
                    kantor_status_keterangan: 'required',
                    kantor_status_warna: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            kantorStatus.kantor_status_keterangan = data.kantor_status_keterangan
            kantorStatus.kantor_status_warna = data.kantor_status_warna

            await kantorStatus.save()
            return response.json(kantorStatus)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status kantor tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const kantorStatus = await KantorStatus.findOrFail(params.id)
            kantorStatus.delete()

            return response.json({ message: 'Kantor status berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status kantor tidak ditemukan'
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
            let column = pagination.column || 'kantor_status_id';
            let sort = pagination.sort || 'desc';

            const kantorStatus = await KantorStatus.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(kantorStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'kantor_status_keterangan';
            let value = search.value.toLowerCase();

            let kantorStatus = await KantorStatus.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(kantorStatus.rows.length == 0){
                return response.status(404).send({
                    message : 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }
            
            return response.json(kantorStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

}

module.exports = KantorStatusController
