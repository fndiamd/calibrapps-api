'use strict'

const CustomerStatus = use('App/Models/CustomerStatus')
const { validate } = use('Validator')

let rules = {
    customer_status_keterangan: 'required|unique:customer_statuses,customer_status_keterangan',
    customer_status_warna: 'required|unique:customer_statuses,customer_status_warna'
}

const vmessage = {
    'customer_status_keterangan.required': 'Status tidak boleh kosong',
    'customer_status_keterangan.unique': 'Status sudah ada, tidak boleh duplikat',
    'customer_status_warna.required': 'Warna status tidak boleh kosong',
    'customer_status_warna.unique': 'Warna sudah dipakai, tidak boleh duplikat'
}

class CustomerStatusController {

    async index({ response }) {
        try {
            let customerStatus = await CustomerStatus.query().fetch()
            return response.json(customerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params }) {
        try {
            let customerStatus = await CustomerStatus.findOrFail(params.id)

            return customerStatus
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status customer tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const customerStatus = new CustomerStatus()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                customer_status_keterangan: request.input('customer_status_keterangan'),
                customer_status_warna: request.input('customer_status_warna')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            customerStatus.customer_status_keterangan = data.customer_status_keterangan
            customerStatus.customer_status_warna = data.customer_status_warna

            await customerStatus.save()
            return response.json(customerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let customerStatus = await CustomerStatus.find(params.id)

            const data = {
                customer_status_keterangan: request.input('customer_status_keterangan'),
                customer_status_warna: request.input('customer_status_warna')
            }

            if (customerStatus.customer_status_keterangan === data.customer_status_keterangan ||
                customerStatus.customer_status_warna === data.customer_status_warna) {
                rules = {
                    customer_status_keterangan: 'required',
                    customer_status_warna: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            customerStatus.customer_status_keterangan = data.customer_status_keterangan
            customerStatus.customer_status_warna = data.customer_status_warna

            await customerStatus.save()
            return response.json(customerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const customerStatus = await CustomerStatus.findOrFail(params.id)
            customerStatus.delete()

            return response.json({ message: 'Customer status berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status customer tidak ditemukan'
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
            let column = pagination.column || 'customer_status_id';
            let sort = pagination.sort || 'desc';

            const customerStatus = await CustomerStatus.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(customerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'customer_status_keterangan';
            let value = search.value.toLowerCase();

            let customerStatus = await CustomerStatus.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(customerStatus.rows.length == 0){
                return response.status(404).send({
                    message : 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(customerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = CustomerStatusController
