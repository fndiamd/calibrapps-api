'use strict'

const Sertifikat = use('App/Models/Sertifikat')
const Helpers = use('Helpers')

class SertifikatController {

    async index({ response }) {
        try {
            let sertifikat = await Sertifikat
                .query()
                .with('barangKalibrasi')
                .fetch()
            return response.json(sertifikat)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let checkSertifikat = await Sertifikat.findOrFail(params.id)
            let sertifikat = await Sertifikat
                .query()
                .where('sertifikat_id', params.id)
                .with('barangKalibrasi')
                .first()

            return sertifikat
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Sertifikat tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async readSertifikat({ params, response }) {
        // const dataSertifikat = await Sertifikat
        //     .query()
        //     .where('sertifikat_nomor', params.sertifikat_nomor)
        //     .first();
        const fs = use('fs')
        const readFile = Helpers.promisify(fs.readFile)
        response.implicitEnd = false

        fs.readFile(Helpers.resourcesPath('uploads/sertifikat/') + 'tree-736885.jpg', (error, contents) => {
            response.send(contents, '123123.jpg')
        })
    }

    async store({ response, request }) {
        try {
            const sertifikat = new Sertifikat()
            const sertifikatFile = request.file('sertifikat_file', {
                types: ['images', 'jpg', 'jpeg', 'png', 'pdf'],
                size: '5mb'
            })


            let nameSertifikat = request.input('sertifikat_nomor') + '-' + request.input('sertifikat_tanggal_terbit') + '.jpg'

            await sertifikatFile.move(Helpers.resourcesPath('uploads/sertifikat'), {
                name: nameSertifikat,
                overwrite: true
            })

            if (!sertifikatFile.moved()) {
                return sertifikatFile.error()
            }

            const data = {
                sertifikat_nomor: request.input('sertifikat_nomor'),
                sertifikat_nomor_seri: request.input('sertifikat_nomor_seri'),
                sertifikat_status: request.input('sertifikat_status'),
                sertifikat_tanggal_terbit: request.input('sertifikat_tanggal_terbit'),
                sertifikat_tanggal_berakhir: request.input('sertifikat_tanggal_berakhir'),
                barang_kalibrasi_id: request.input('barang_kalibrasi_id')
            }

            sertifikat.sertifikat_nomor = data.sertifikat_nomor
            sertifikat.sertifikat_nomor_seri = data.sertifikat_nomor_seri
            sertifikat.sertifikat_file = nameSertifikat
            sertifikat.sertifikat_status = data.sertifikat_status
            sertifikat.sertifikat_tanggal_terbit = data.sertifikat_tanggal_terbit
            sertifikat.sertifikat_tanggal_berakhir = data.sertifikat_tanggal_berakhir
            sertifikat.barang_kalibrasi_id = data.barang_kalibrasi_id

            await sertifikat.save()
            return response.json(sertifikat)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let sertifikat = await Sertifikat.findOrFail(params.id)

            const data = {
                sertifikat_nomor: request.input('sertifikat_nomor'),
                sertifikat_nomor_seri: request.input('sertifikat_nomor_seri'),
                sertifikat_file: request.input('sertifikat_file'),
                sertifikat_status: request.input('sertifikat_status'),
                sertifikat_tanggal_terbit: request.input('sertifikat_tanggal_terbit'),
                sertifikat_tanggal_berakhir: request.input('sertifikat_tanggal_berakhir'),
                barang_kalibrasi_id: request.input('barang_kalibrasi_id')
            }

            sertifikat.sertifikat_nomor = data.sertifikat_nomor
            sertifikat.sertifikat_nomor_seri = data.sertifikat_nomor_seri
            sertifikat.sertifikat_file = data.sertifikat_file
            sertifikat.sertifikat_status = data.sertifikat_status
            sertifikat.sertifikat_tanggal_terbit = data.sertifikat_tanggal_terbit
            sertifikat.sertifikat_tanggal_berakhir = data.sertifikat_tanggal_berakhir
            sertifikat.barang_kalibrasi_id = data.barang_kalibrasi_id

            await sertifikat.save()
            return response.json(sertifikat)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Sertifikat tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const sertifikat = await Sertifikat.findOrFail(params.id)
            sertifikat.delete()

            return response.json({ message: 'Sertifikat Order berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Sertifikat order tidak ditemukan'
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
            let column = pagination.column || 'sertifikat_id';
            let sort = pagination.sort || 'desc';

            const sertifikat = await Sertifikat.query()
                .with('barangKalibrasi')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(sertifikat)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'sertifikat_nomor';
            let value = search.value.toLowerCase()

            let sertifikat = await Sertifikat.query()
                .with('barangKalibrasi')
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (sertifikat.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(sertifikat)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = SertifikatController
