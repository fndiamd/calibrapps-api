'use strict'

const KantorCabang = use('App/Models/KantorCabang')
const { validate } = use('Validator')

let rules = {
    kantor_cabang_nama: 'required',
    kantor_cabang_alamat: 'required',
    kantor_cabang_telepon: 'required',
    kantor_cabang_fax: 'required',
    kantor_cabang_email: 'required|unique:kantor_cabangs,kantor_cabang_email',
    kantor_status_id: 'required',
}

const vmessage = {
    'kantor_cabang_nama.required': 'Nama kantor cabang tidak boleh kosong',
    'kantor_cabang_email.required': 'Email kantor tidak boleh kosong',
    'kantor_cabang_email.unique': 'Email sudah terpakai, tidak boleh sama',
    'kantor_status_id.required': 'Status kantor tidak boleh kosong',
}

class KantorCabangController {

    async index({ auth, response }) {
        try {
            let kantorCabang = await KantorCabang.query()
                .with('kantorStatus')
                .fetch()

            return response.json(kantorCabang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let kantor = await KantorCabang.findOrFail(params.id);
            let kantorCabang = await KantorCabang
                .query()
                .where('kantor_cabang_id', params.id)
                .with('kantorStatus')
                .first()

            return kantorCabang
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Kantor cabang tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const kantorCabang = new KantorCabang()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                kantor_cabang_nama: request.input('kantor_cabang_nama'),
                kantor_cabang_alamat: request.input('kantor_cabang_alamat'),
                kantor_cabang_telepon: request.input('kantor_cabang_telepon'),
                kantor_cabang_fax: request.input('kantor_cabang_fax'),
                kantor_cabang_email: request.input('kantor_cabang_email'),
                kantor_status_id: request.input('kantor_status_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            kantorCabang.kantor_cabang_nama = data.kantor_cabang_nama
            kantorCabang.kantor_cabang_alamat = data.kantor_cabang_alamat
            kantorCabang.kantor_cabang_telepon = data.kantor_cabang_telepon
            kantorCabang.kantor_cabang_fax = data.kantor_cabang_fax
            kantorCabang.kantor_cabang_email = data.kantor_cabang_email
            kantorCabang.kantor_status_id = data.kantor_status_id

            await kantorCabang.save()
            return response.json(kantorCabang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let kantorCabang = await KantorCabang.findOrFail(params.id)

            const data = {
                kantor_cabang_nama: request.input('kantor_cabang_nama'),
                kantor_cabang_alamat: request.input('kantor_cabang_alamat'),
                kantor_cabang_telepon: request.input('kantor_cabang_telepon'),
                kantor_cabang_fax: request.input('kantor_cabang_fax'),
                kantor_cabang_email: request.input('kantor_cabang_email'),
                kantor_status_id: request.input('kantor_status_id')
            }

            if (kantorCabang.kantor_cabang_email === data.kantor_cabang_email) {
                rules.kantor_cabang_email = 'required'
            }

            const validation = await validate(request.all(), rules, vmessage);
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            kantorCabang.kantor_cabang_nama = data.kantor_cabang_nama
            kantorCabang.kantor_cabang_alamat = data.kantor_cabang_alamat
            kantorCabang.kantor_cabang_telepon = data.kantor_cabang_telepon
            kantorCabang.kantor_cabang_fax = data.kantor_cabang_fax
            kantorCabang.kantor_cabang_email = data.kantor_cabang_email
            kantorCabang.kantor_status_id = data.kantor_status_id

            await kantorCabang.save()
            return response.json(kantorCabang)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Kantor cabang tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const kantorCabang = await KantorCabang.findOrFail(params.id)
            kantorCabang.delete()

            return response.json({ message: 'Kantor cabang berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Kantor cabang tidak ditemukan'
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
            let column = pagination.column || 'kantor_cabang_id';
            let sort = pagination.sort || 'desc';

            const kantorCabang = await KantorCabang.query()
                .with('kantorStatus')
                .orderBy(`${pagination.column}`, `${pagination.sort}`)
                .paginate(page, limit)

            return response.json(kantorCabang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'kantor_cabang_nama';
            let value = search.value.toLowerCase();

            let kantorCabang = await KantorCabang.query()
                .with('kantorStatus')
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(kantorCabang.rows.length == 0){
                return response.status(404).send({
                    message : 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(kantorCabang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = KantorCabangController
