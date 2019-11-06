'use strict'

const UnsurKalibrasi = use('App/Models/UnsurKalibrasi')

class UnsurKalibrasiController {

    async index({ response }) {
        let unsurKalibrasi = await UnsurKalibrasi.query().fetch()
        return response.json(unsurKalibrasi)
    }

    async view({params, response }){
        let unsurKalibrasi = await UnsurKalibrasi.query().where('unsur_kalibrasi_id', params.id).first()
        return unsurKalibrasi
    }

    async store({ response, request }) {
        const unsurKalibrasi = new UnsurKalibrasi()
        const data = {
            unsur_kalibrasi_nama: request.input('unsur_kalibrasi_nama')
        }

        unsurKalibrasi.unsur_kalibrasi_nama = data.unsur_kalibrasi_nama

        await unsurKalibrasi.save()
        return response.json(unsurKalibrasi)
    }

    async update({ params, response, request }) {
        let unsurKalibrasi = await UnsurKalibrasi.find(params.id)

        const data = {
            unsur_kalibrasi_nama: request.input('unsur_kalibrasi_nama')
        }

        unsurKalibrasi.unsur_kalibrasi_nama = data.unsur_kalibrasi_nama

        await unsurKalibrasi.save()
        return response.json(unsurKalibrasi)
    }

    async delete({ params, response }) {
        const unsurKalibrasi = await UnsurKalibrasi.find(params.id)
        unsurKalibrasi.delete()
        return response.json({ message: 'Unsur kalibrasi berhasil dihapus' })
    }

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const unsurKalibrasi = await UnsurKalibrasi.query()
        .orderBy(`${pagination.column}`, request.sort)
        .paginate(page, limit)
        return response.json(unsurKalibrasi)
    }
}

module.exports = UnsurKalibrasiController
