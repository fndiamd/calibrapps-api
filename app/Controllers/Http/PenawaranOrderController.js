'use strict'

const PenawaranOrder = use('App/Models/PenawaranOrder')

class PenawaranOrderController {

    async index({ response }) {
        try {
            let penawaranOrder = await PenawaranOrder
                .query()
                .with('penawaranStatus')
                .fetch()
            return response.json(penawaranOrder)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let penawaran = await PenawaranOrder.findOrFail(params.id)
            let penawaranOrder = await PenawaranOrder
                .query()
                .where('penawaran_order_id', params.id)
                .with('penawaranStatus')
                .first()
            return penawaranOrder
        } catch (error) {e
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Penawaran order tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const penawaranOrder = new PenawaranOrder()
            const data = {
                penawaran_order_nomor: request.input('penawaran_order_nomor'),
                penawaran_order_perusahaan: request.input('penawaran_order_perusahaan'),
                penawaran_order_tanggal_penawaran: request.input('penawaran_order_tanggal_penawaran'),
                penawaran_order_file: request.input('penawaran_order_file'),
                penawaran_status_id: request.input('penawaran_status_id')
            }

            penawaranOrder.penawaran_order_nomor = data.penawaran_order_nomor
            penawaranOrder.penawaran_order_perusahaan = data.penawaran_order_perusahaan
            penawaranOrder.penawaran_order_tanggal_penawaran = data.penawaran_order_tanggal_penawaran
            penawaranOrder.penawaran_order_file = data.penawaran_order_file
            penawaranOrder.penawaran_status_id = data.penawaran_status_id

            await penawaranOrder.save()
            return response.json(penawaranOrder)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let penawaranOrder = await PenawaranOrder.findOrFail(params.id)

            const data = {
                penawaran_order_nomor: request.input('penawaran_order_nomor'),
                penawaran_order_perusahaan: request.input('penawaran_order_perusahaan'),
                penawaran_order_tanggal_penawaran: request.input('penawaran_order_tanggal_penawaran'),
                penawaran_order_file: request.input('penawaran_order_file'),
                penawaran_status_id: request.input('penawaran_status_id')
            }

            penawaranOrder.penawaran_order_nomor = data.penawaran_order_nomor
            penawaranOrder.penawaran_order_perusahaan = data.penawaran_order_perusahaan
            penawaranOrder.penawaran_order_tanggal_penawaran = data.penawaran_order_tanggal_penawaran
            penawaranOrder.penawaran_order_file = data.penawaran_order_file
            penawaranOrder.penawaran_status_id = data.penawaran_status_id

            await penawaranOrder.save()
            return response.json(penawaranOrder)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Penawaran order tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const penawaranOrder = await PenawaranOrder.findOrFail(params.id)
            penawaranOrder.delete()

            return response.json({ message: 'Penawaran oder berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Penawaran order tidak ditemukan'
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
            let column = pagination.column || 'penawaran_order_id';
            let sort = pagination.sort || 'desc';

            const penawaranOrder = await PenawaranOrder.query()
                .with('penawaranStatus')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(penawaranOrder)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'penawaran_order_nomor';
            let value = search.value.toLowerCase();

            let penawaranOrder = await PenawaranOrder.query()
                .with('penawaranStatus')
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(penawaranOrder.rows.length == 0){
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(penawaranOrder)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = PenawaranOrderController
