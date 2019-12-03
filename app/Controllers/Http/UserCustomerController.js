'use strict'

const UserCustomer = use('App/Models/UserCustomer')
const { validate } = use('Validator')

let rules = {
    user_customer_nama: 'required',
    user_customer_email: 'required|email|unique:user_customers,user_customer_email',
    user_customer_password: 'required|min:8'
}

const vmessage = {
    'user_customer_nama.required': 'Nama tidak boleh kosong!',
    'user_customer_email.required': 'E-mail tidak boleh kosong!',
    'user_customer_email.email': 'E-mail harus valid',
    'user_customer_email.unique': 'E-mail sudah digunakan oleh user lain',
    'user_customer_password.required': 'Password tidak boleh kosong!',
    'user_customer_password.min': 'Password minimal berisi 8 karakter'
}

class UserCustomerController {

    async index({ response }) {
        try {
            let userCustomer = await UserCustomer
                .query()
                .with('customerPerusahaan')
                .with('customerRole')
                .fetch()

            return response.json(userCustomer)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            const customer = await UserCustomer.findOrFail(params.id)
            const userCustomer = await UserCustomer
                .query()
                .where('user_customer_id', params.id)
                .with('customerPerusahaan')
                .with('customerRole')
                .first()

            return userCustomer
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'User tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const userCustomer = new UserCustomer()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                user_customer_nama: request.input('user_customer_nama'),
                user_customer_email: request.input('user_customer_email'),
                user_customer_password: request.input('user_customer_password'),
                user_customer_telepon: request.input('user_customer_telepon'),
                user_customer_alamat: request.input('user_customer_alamat'),
                user_customer_status: request.input('user_customer_status'),
                customer_perusahaan_id: request.input('customer_perusahaan_id'),
                customer_role_id: request.input('customer_role_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            userCustomer.user_customer_nama = data.user_customer_nama
            userCustomer.user_customer_email = data.user_customer_email
            userCustomer.user_customer_password = data.user_customer_password
            userCustomer.user_customer_telepon = data.user_customer_telepon
            userCustomer.user_customer_alamat = data.user_customer_alamat
            userCustomer.user_customer_status = data.user_customer_status
            userCustomer.customer_perusahaan_id = data.customer_perusahaan_id
            userCustomer.customer_role_id = data.customer_role_id

            await userCustomer.save()
            return response.json(userCustomer)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            const userCustomer = await UserCustomer.findOrFail(params.id)

            const data = {
                user_customer_nama: request.input('user_customer_nama'),
                user_customer_email: request.input('user_customer_email'),
                user_customer_password: request.input('user_customer_password'),
                user_customer_telepon: request.input('user_customer_telepon'),
                user_customer_alamat: request.input('user_customer_alamat'),
                user_customer_status: request.input('user_customer_status'),
                customer_perusahaan_id: request.input('customer_perusahaan_id'),
                customer_role_id: request.input('customer_role_id')
            }

            if (userCustomer.user_customer_email === data.user_customer_email) {
                rules = {
                    user_customer_nama: 'required',
                    user_customer_email: 'required|email',
                    user_customer_password: 'required|min:8'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            userCustomer.user_customer_nama = data.user_customer_nama
            userCustomer.user_customer_email = data.user_customer_email
            userCustomer.user_customer_password = data.user_customer_password
            userCustomer.user_customer_telepon = data.user_customer_telepon
            userCustomer.user_customer_alamat = data.user_customer_alamat
            userCustomer.user_customer_status = data.user_customer_status
            userCustomer.customer_perusahaan_id = data.customer_perusahaan_id
            userCustomer.customer_role_id = data.customer_role_id

            await userCustomer.save()
            return response.json(userCustomer)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'User tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const userCustomer = await UserCustomer.findOrFail(params.id)

            userCustomer.delete()
            return response.json({ message: 'User customer berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'User tidak ditemukan'
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
            let column = pagination.column || 'user_customer_id';
            let sort = pagination.sort || 'desc';

            const userCustomer = await UserCustomer.query()
                .with('customerPerusahaan')
                .with('customerRole')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(userCustomer)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'operator', 'value'])
            let column = search.column || 'user_customer_nama';
            let operator = search.operator || '='
            let value = search.value

            if (operator == 'LIKE') {
                let userCustomer = await UserCustomer.query()
                    .with('customerPerusahaan')
                    .with('customerRole')
                    .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                    .fetch()
            }else{
                let userCustomer = await UserCustomer.query()
                .with('customerPerusahaan')
                .with('customerRole')
                .whereRaw(`${column} ${operator} ${value}`)
                .fetch()
            }


            if (userCustomer.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(userCustomer)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }
}

module.exports = UserCustomerController
