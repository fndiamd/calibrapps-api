'use strict'

const TransaksiBroker = use('App/Models/TransaksiBroker')

class TransaksiBrokerController {

    async index({ response }) {
        try {
            let transaksiBroker = await TransaksiBroker.query()
                .with('perusahaanBroker')
                .with('barangKalibrasi')
                .with('transaksiBrokerStatus')
                .fetch()

            return response.json(transaksiBroker)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let transaksi = await TransaksiBroker.findOrFail(params.id)
            let transaksiBroker = await TransaksiBroker
                .query()
                .where('transaksi_broker_id', params.id)
                .with('perusahaanBroker')
                .with('barangKalibrasi')
                .with('transaksiBrokerStatus')
                .first()

            return transaksiBroker
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Transaksi tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const transaksiBroker = new TransaksiBroker()
            const data = {
                transaksi_broker_tanggal_penyerahan: request.input('transaksi_broker_tanggal_penyerahan'),
                perusahaan_broker_id: request.input('perusahaan_broker_id'),
                barang_kalibrasi_id: request.input('barang_kalibrasi_id'),
                transaksi_broker_status_id: request.input('transaksi_broker_status_id')
            }

            transaksiBroker.transaksi_broker_tanggal_penyerahan = data.transaksi_broker_tanggal_penyerahan
            transaksiBroker.perusahaan_broker_id = data.perusahaan_broker_id
            transaksiBroker.barang_kalibrasi_id = data.barang_kalibrasi_id
            transaksiBroker.transaksi_broker_status_id = data.transaksi_broker_status_id

            await transaksiBroker.save()
            return response.json(transaksiBroker)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let transaksiBroker = await TransaksiBroker.findOrFail(params.id)

            const data = {
                transaksi_broker_tanggal_penyerahan: request.input('transaksi_broker_tanggal_penyerahan'),
                perusahaan_broker_id: request.input('perusahaan_broker_id'),
                barang_kalibrasi_id: request.input('barang_kalibrasi_id'),
                transaksi_broker_status_id: request.input('transaksi_broker_status_id')
            }

            transaksiBroker.transaksi_broker_tanggal_penyerahan = data.transaksi_broker_tanggal_penyerahan
            transaksiBroker.perusahaan_broker_id = data.perusahaan_broker_id
            transaksiBroker.barang_kalibrasi_id = data.barang_kalibrasi_id
            transaksiBroker.transaksi_broker_status_id = data.transaksi_broker_status_id

            await transaksiBroker.save()
            return response.json(transaksiBroker)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Transaksi tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const transaksiBroker = await TransaksiBroker.findOrFail(params.id)
            transaksiBroker.delete()

            return response.json({ message: 'Transaksi broker berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Transaksi tidak ditemukan'
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
            let column = pagination.column || 'transaksi_broker_id';
            let sort = pagination.sort || 'desc';

            const transaksiBroker = await TransaksiBroker.query()
                .with('perusahaanBroker')
                .with('barangKalibrasi')
                .with('transaksiBrokerStatus')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(transaksiBroker)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'transaksi_broker_nomor';
            let value = search.value.toLowerCase();

            let transaksiBroker = await TransaksiBroker
                .query()
                .with('perusahaanBroker')
                .with('barangKalibrasi')
                .with('transaksiBrokerStatus')
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (transaksiBroker.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(transaksiBroker)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = TransaksiBrokerController
