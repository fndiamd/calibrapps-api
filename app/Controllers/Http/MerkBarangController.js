'use strict'

const MerkBarang = use('App/Models/MerkBarang')

class MerkBarangController {

    async index({ response }) {
        try {
            let merkBarang = await MerkBarang.query().fetch()

            return response.json(merkBarang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let merkBarang = await MerkBarang.findOrFail(params.id)

            return merkBarang
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Merk barang tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const merkBarang = new MerkBarang()

            const data = {
                merk_barang_nama: request.input('merk_barang_nama')
            }

            merkBarang.merk_barang_nama = data.merk_barang_nama

            await merkBarang.save()
            return response.json(merkBarang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let merkBarang = await MerkBarang.findOrFail(params.id)

            const data = {
                merk_barang_nama: request.input('merk_barang_nama')
            }

            merkBarang.merk_barang_nama = data.merk_barang_nama

            await merkBarang.save()
            return response.json(merkBarang)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Merk barang tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const merkBarang = await MerkBarang.findOrFail(params.id)
            merkBarang.delete()

            return response.json({ message: 'Merk barang berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Merk barang tidak ditemukan'
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
            let column = pagination.column || 'merk_barang_id';
            let sort = pagination.sort || 'desc';

            const merkBarang = await MerkBarang.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(merkBarang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'merk_barang_nama';
            let value = search.value.toLowerCase();

            let merkBarang = await MerkBarang.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(merkBarang.rows.length == 0){
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(merkBarang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = MerkBarangController
