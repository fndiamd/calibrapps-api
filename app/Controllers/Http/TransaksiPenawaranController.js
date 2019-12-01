'use strict'

const TransaksiPenawaran = use('App/Models/TransaksiPenawaran')

class TransaksiPenawaranController {
    async index({ response }) {
        try {
            let transaksiPenawaran = await TransaksiPenawaran
                .query()
                .with('penawaranOrder')
                .with('progresOrder')
                .fetch()

            return response.json(transaksiPenawaran)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async view({ params, response }) {
        try {

            const transaksiPenawaran = await TransaksiPenawaran
                .query()
                .where('progres_order_id', params.id)
                .with('penawaranOrder')
                .with('progresOrder')
                .fetch()

            if (transaksiPenawaran.rows.length == 0) {
                return response.status(404).send({
                    message: 'Transaksi penawaran tidak ditemukan'
                })
            }

            return transaksiPenawaran
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const transaksiPenawaran = new TransaksiPenawaran()
            const data = {
                penawaran_order_id: request.input('penawaran_order_id'),
                progres_order_id: request.input('progres_order_id')
            }

            transaksiPenawaran.penawaran_order_id = data.penawaran_order_id
            transaksiPenawaran.progres_order_id = data.progres_order_id

            await transaksiPenawaran.save()
            return response.json(transaksiPenawaran)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async update({ params, response, request }) {
        try {
            let transaksiPenawaran = await TransaksiPenawaran.findOrFail(params.id)

            const data = {
                penawaran_order_id: request.input('penawaran_order_id'),
                progres_order_id: request.input('progres_order_id')
            }

            transaksiPenawaran.penawaran_order_id = data.penawaran_order_id
            transaksiPenawaran.progres_order_id = data.progres_order_id

            await transaksiPenawaran.save()
            return response.json(transaksiPenawaran)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Unsur kaji ulang tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const transaksiPenawaran = await transaksiPenawaran
                .query()
                .where('progres_order_id', params.id)

            if (transaksiPenawaran.rows.length == 0) {
                return response.status(404).send({
                    message: 'Transaksi penawaran tidak ditemukan'
                })
            }

            transaksiPenawaran.delete()

            return response.json({ message: 'Transaksi penawaran berhasil dihapus' })
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
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

            const transaksiPenawaran = await transaksiPenawaran.query()
                .with('penawaranOrder')
                .with('progresOrder')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(transaksiPenawaran)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'penawaran_order_id';
            let value = search.value;

            let transaksiPenawaran = await transaksiPenawaran.query()
                .with('penawaranOrder')
                .with('progresOrder')
                .whereRaw(`${column} = '${value}'`)
                .fetch()

            if (transaksiPenawaran.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(transaksiPenawaran)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }
}

module.exports = TransaksiPenawaranController
