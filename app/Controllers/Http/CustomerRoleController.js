'use strict'

const CustomerRole = use('App/Models/CustomerRole')
const { validate } = use('Validator')

let rules = {
    customer_role_keterangan: 'required|unique:customer_roles,customer_role_keterangan',
    customer_role_warna: 'required|unique:customer_roles,customer_role_warna'
}

const vmessage = {
    'customer_role_keterangan.required': 'Role tidak boleh kosong',
    'customer_role_keterangan.unique': 'Role sudah ada, tidak boleh duplikat',
    'customer_role_warna.required': 'Warna tidak boleh kosong',
    'customer_role_warna.unique': 'Warna role sudah ada, tidak boleh duplikat'
}

class CustomerRoleController {

    async index({ response }) {
        try {
            let customerRole = await CustomerRole.query().fetch()

            return response.json(customerRole)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params }) {
        try {
            let customerRole = await CustomerRole.findOrFail(params.id)

            return customerRole
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Role customer tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const customerRole = new CustomerRole()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                customer_role_keterangan: request.input('customer_role_keterangan'),
                customer_role_warna: request.input('customer_role_warna')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            customerRole.customer_role_keterangan = data.customer_role_keterangan
            customerRole.customer_role_warna = data.customer_role_warna

            await customerRole.save()
            return response.json(customerRole)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let customerRole = await CustomerRole.find(params.id)

            const data = {
                customer_role_keterangan: request.input('customer_role_keterangan'),
                customer_role_warna: request.input('customer_role_warna')
            }

            if (customerRole.customer_role_keterangan === data.customer_role_keterangan ||
                customerRole.customer_role_warna === data.customer_role_warna) {
                rules = {
                    customer_role_keterangan: 'required',
                    customer_role_warna: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            customerRole.customer_role_keterangan = data.customer_role_keterangan
            customerRole.customer_role_warna = data.customer_role_warna

            await customerRole.save()
            return response.json(customerRole)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const customerRole = await CustomerRole.findOrFail(params.id)
            customerRole.delete()

            return response.json({ message: 'Customer role berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Role customer tidak ditemukan'
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
            let column = pagination.column || 'customer_role_id';
            let sort = pagination.sort || 'desc';

            const customerRole = await CustomerRole.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(customerRole)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'customer_role_keterangan';
            let value = search.column.toLowerCase();

            let customerRole = await CustomerRole.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (customerRole.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(customerRole)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = CustomerRoleController
