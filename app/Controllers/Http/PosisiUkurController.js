'use strict'

const PosisiUkur = use('App/Models/PosisiUkur')

class PosisiUkurController {

    async index({ response }) {
        try {
            let posisiUkur = await PosisiUkur.query().fetch()
            return response.json(posisiUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let posisiUkur = await PosisiUkur.findOrFail(params.id)
            return posisiUkur
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Posisi ukur tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const posisiUkur = new PosisiUkur()
            const data = {
                posisi_ukur_posisi: request.input('posisi_ukur_posisi')
            }

            posisiUkur.posisi_ukur_posisi = data.posisi_ukur_posisi

            await posisiUkur.save()
            return response.json(posisiUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let posisiUkur = await PosisiUkur.findOrFail(params.id)

            const data = {
                posisi_ukur_posisi: request.input('posisi_ukur_posisi')
            }

            posisiUkur.posisi_ukur_posisi = data.posisi_ukur_posisi

            await posisiUkur.save()
            return response.json(posisiUkur)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Posisi ukur tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const posisiUkur = await PosisiUkur.findOrFail(params.id)
            posisiUkur.delete()

            return response.json({ message: 'Posisi ukur berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Posisi ukur tidak ditemukan'
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
            let column = pagination.column || 'posisi_ukur_id';
            let sort = pagination.sort || 'desc';

            const posisiUkur = await PosisiUkur.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(posisiUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'posisi_ukur_posisi';
            let value = search.value.toLowerCase();

            let posisiUkur = await PosisiUkur.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(posisiUkur.rows.length == 0){
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(posisiUkur)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = PosisiUkurController
