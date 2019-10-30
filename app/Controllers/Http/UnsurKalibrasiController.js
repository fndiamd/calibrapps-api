'use strict'

const UnsurKalibrasi = use('App/Models/UnsurKalibrasi')

class UnsurKalibrasiController {

    async index({ response }) {
        let unsurKalibrasi = await UnsurKalibrasi.query().fetch()
        return response.json(unsurKalibrasi)
    }

    async store({ response, request }) {
        const unsurKajiUlang = new UnsurKalibrasi()
        const data = {
            unsur_kalibrasi_nama: request.input('unsur_kalibrasi_nama')
        }

        unsurKajiUlang.unsur_kalibrasi_nama = data.unsur_kalibrasi_nama

        await unsurKajiUlang.save()
        return response.json(unsurKajiUlang)
    }

    async update({ params, response, request }) {
        let unsurKalibrasi = await UnsurKalibrasi.find(params.id)

        const data = {
            unsur_kalibrasi_nama: request.input('unsur_kalibrasi_nama')
        }

        unsurKajiUlang.unsur_kalibrasi_nama = data.unsur_kalibrasi_nama

        await unsurKajiUlang.save()
        return response.json(unsurKajiUlang)
    }

    async delete({ params, response }) {
        const unsurKalibrasi = await UnsurKalibrasi.find(params.id)
        unsurKalibrasi.delete()
        return response.json({ message: 'Unsur kalibrasi berhasil dihapus' })
    }
}

module.exports = UnsurKalibrasiController
