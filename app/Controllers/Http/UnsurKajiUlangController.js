'use strict'

const UnsurKajiUlang = use('App/Models/UnsurKajiUlang')

class UnsurKajiUlangController {

    async index({ response }) {
        try {
            let unsurKajiUlang = await UnsurKajiUlang
                .query()
                .with('unsurKalibrasi')
                .with('progresOrder')
                .fetch()

            return response.json(unsurKajiUlang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async view({ params, response }) {
        try {
            const unsur = await UnsurKajiUlang.findOrFail(params.id)
            const unsurKajiUlang = await UnsurKajiUlang
                .query()
                .where('progres_order_id', params.id)
                .with('unsurKalibrasi')
                .fetch()

            return unsurKajiUlang
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

    async store({ response, request }) {
        try {
            const unsurKajiUlang = new UnsurKajiUlang()
            const data = {
                progres_order_id: request.input('progres_order_id')
            }

            unsurKajiUlang.progres_order_id = data.progres_order_id

            await unsurKajiUlang.save()
            return response.json(unsurKajiUlang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async update({ params, response, request }) {
        try {
            let unsurKajiUlang = await UnsurKajiUlang.findOrFail(params.id)

            const data = {
                progres_order_id: request.input('progres_order_id')
            }

            unsurKajiUlang.progres_order_id = data.progres_order_id

            await unsurKajiUlang.save()
            return response.json(unsurKajiUlang)
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
            const unsurKajiUlang = await UnsurKajiUlang.findOrFail(params.id)
            unsurKajiUlang.delete()

            return response.json({ message: 'Unsur kaji ulang berhasil dihapus' })
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

    async pagination({ request, response }) {
        try {
            let pagination = request.only(['page', 'limit', 'column', 'sort'])
            let page = pagination.page || 1;
            let limit = pagination.limit || 10;
            let column = pagination.column || 'unsur_kalibrasi_id';
            let sort = pagination.sort || 'desc';

            const unsurKajiUlang = await UnsurKajiUlang.query()
                .with('unsurKalibrasi')
                .with('progresOrder')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(unsurKajiUlang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'unsur_kalibrasi_id';
            let value = search.value;

            let unsurKajiUlang = await UnsurKajiUlang.query()
                .with('unsurKalibrasi')
                .with('progresOrder')
                .whereRaw(`${column} LIKE '%${value}%'`)
                .fetch()

            if (unsurKajiUlang.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(unsurKajiUlang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }
}

module.exports = UnsurKajiUlangController
