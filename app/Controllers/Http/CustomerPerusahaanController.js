'use strict'

const CustomerPerusahaan = use('App/Models/CustomerPerusahaan')
const { validate } = use('Validator')

let rules = {
    customer_perusahaan_npwp: 'required|unique:customer_perusahaans,customer_perusahaan_npwp',
    customer_perusahaan_nama: 'required',
    customer_status_id: 'required'
}

const vmessage = {
    'customer_perusahaan_npwp.unique': 'Nomor NPWP sudah digunakan, tidak boleh duplikat',
    'customer_perusahaan_npwp.required': 'Nomor NPWP tidak boleh kosong',
    'customer_perusahaan_nama.required' : 'Nama perusahaan tidak boleh kosong',
    'customer_status_id.required': 'Status customer tidak boleh kosong'
}

class CustomerPerusahaanController {

    async index({ response }) {
        try {
            let customerPerusahaan = await CustomerPerusahaan
                .query()
                .with('customerStatus')
                .fetch()

            return response.json(customerPerusahaan)
        } catch (error) {
            return response.status(400).send({
                message: error.message//'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params }) {
        try {
            let perusahaan = await CustomerPerusahaan.findOrFail(params.id)
            let customerPerusahaan = await CustomerPerusahaan
                .query()
                .where('customer_perusahaan_id', params.id)
                .with('customerStatus')
                .first()

            return customerPerusahaan
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Perusahaan customer tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const customerPerusahaan = new CustomerPerusahaan()
            const count = await CustomerPerusahaan.query().count('* as total')
            const pkal = 1300 + parseInt(count[0]['total']);
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                customer_perusahaan_npwp: request.input('customer_perusahaan_npwp'),
                customer_perusahaan_pkal: pkal,
                customer_perusahaan_nama: request.input('customer_perusahaan_nama'),
                customer_perusahaan_alamat: request.input('customer_perusahaan_alamat'),
                customer_perusahaan_telepon: request.input('customer_perusahaan_telepon'),
                customer_perusahaan_fax: request.input('customer_perusahaan_fax'),
                customer_status_id: request.input('customer_status_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            customerPerusahaan.customer_perusahaan_npwp = data.customer_perusahaan_npwp
            customerPerusahaan.customer_perusahaan_pkal = data.customer_perusahaan_pkal
            customerPerusahaan.customer_perusahaan_nama = data.customer_perusahaan_nama
            customerPerusahaan.customer_perusahaan_alamat = data.customer_perusahaan_alamat
            customerPerusahaan.customer_perusahaan_telepon = data.customer_perusahaan_telepon
            customerPerusahaan.customer_perusahaan_fax = data.customer_perusahaan_fax
            customerPerusahaan.customer_status_id = data.customer_status_id

            await customerPerusahaan.save()
            return response.json(customerPerusahaan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let customerPerusahaan = await CustomerPerusahaan.findOrFail(params.id)

            const data = {
                customer_perusahaan_npwp: request.input('customer_perusahaan_npwp'),
                customer_perusahaan_pkal: request.input('customer_perusahaan_pkal'),
                customer_perusahaan_nama: request.input('customer_perusahaan_nama'),
                customer_perusahaan_alamat: request.input('customer_perusahaan_alamat'),
                customer_perusahaan_telepon: request.input('customer_perusahaan_telepon'),
                customer_perusahaan_fax: request.input('customer_perusahaan_fax'),
                customer_perusahaan_verif: request.input('customer_perusahaan_verif'),
                customer_status_id: request.input('customer_status_id')
            }

            if (customerPerusahaan.customer_perusahaan_npwp === data.customer_perusahaan_npwp) {
                rules.customer_perusahaan_npwp = 'required'
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            customerPerusahaan.customer_perusahaan_npwp = data.customer_perusahaan_npwp
            customerPerusahaan.customer_perusahaan_pkal = data.customer_perusahaan_pkal
            customerPerusahaan.customer_perusahaan_nama = data.customer_perusahaan_nama
            customerPerusahaan.customer_perusahaan_alamat = data.customer_perusahaan_alamat
            customerPerusahaan.customer_perusahaan_telepon = data.customer_perusahaan_telepon
            customerPerusahaan.customer_perusahaan_fax = data.customer_perusahaan_fax
            customerPerusahaan.customer_perusahaan_verif = data.customer_perusahaan_verif
            customerPerusahaan.customer_status_id = data.customer_status_id

            await customerPerusahaan.save()
            return response.json(customerPerusahaan)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Perusahaan customer tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const customerPerusahaan = await CustomerPerusahaan.findOrFail(params.id)
            customerPerusahaan.delete()

            return response.json({ message: 'Customer perusahaan berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Perusahaan customer tidak ditemukan'
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
            let column = pagination.column || 'customer_perusahaan_id';
            let sort = pagination.sort || 'desc';

            const customerPerusahaan = await CustomerPerusahaan.query()
                .with('customerStatus')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(customerPerusahaan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'customer_perusahaan_nama'
            let value = search.value.toLowerCase()

            let customerPerusahaan = await CustomerPerusahaan.query()
                .with('customerStatus')
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(customerPerusahaan.rows.length == 0){
                return response.status(404).send({
                    message : 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(customerPerusahaan)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async notify({ request, response }){
        try {
            const customerPerusahaan = await CustomerPerusahaan.query().where('customer_perusahaan_verif', false).fetch()
            const count = await CustomerPerusahaan.query().where('customer_perusahaan_verif',false).count('* as total')
            const data = {
                customerPerusahaan : customerPerusahaan,
                total : count[0]['total']
            }
            return response.json(data)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = CustomerPerusahaanController
