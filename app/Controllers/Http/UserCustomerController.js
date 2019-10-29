'use strict'

const UserCustomer = use('App/Models/UserCustomer')

class UserCustomerController {

    async index({ response }) {
        let userCustomer = await UserCustomer.query().fetch()
        return response.json(userCustomer)
    }

    async store({ response, request }) {
        const userCustomer = new UserCustomer()
        const data = {
            user_customer_nama: request.input('user_customer_nama'),
            user_customer_email: request.input('user_customer_email'),
            user_customer_password: request.input('user_customer_password'),
            user_customer_telepon: request.input('user_customer_telepon'),
            user_customer_alamat: request.input('user_customer_alamat'),
            customer_perusahaan_id: request.input('customer_perusahaan_id'),
            customer_role_id: request.input('customer_role_id')
        }

        userCustomer.user_customer_nama = data.user_customer_nama
        userCustomer.user_customer_email = data.user_customer_email
        userCustomer.user_customer_password = data.user_customer_password
        userCustomer.user_customer_telepon = data.user_customer_telepon
        userCustomer.user_customer_alamat = data.user_customer_alamat
        userCustomer.customer_perusahaan_id = data.customer_perusahaan_id
        userCustomer.customer_role_id = data.customer_role_id

        await userCustomer.save()
        return response.json(userCustomer)
    }

    async update({ params, response, request }) {
        let userCustomer = await UserCustomer.find(params.id)

        const data = {
            user_customer_nama: request.input('user_customer_nama'),
            user_customer_email: request.input('user_customer_email'),
            user_customer_password: request.input('user_customer_password'),
            user_customer_telepon: request.input('user_customer_telepon'),
            user_customer_alamat: request.input('user_customer_alamat'),
            customer_perusahaan_id: request.input('customer_perusahaan_id'),
            customer_role_id: request.input('customer_role_id')
        }

        userCustomer.user_customer_nama = data.user_customer_nama
        userCustomer.user_customer_email = data.user_customer_email
        userCustomer.user_customer_password = data.user_customer_password
        userCustomer.user_customer_telepon = data.user_customer_telepon
        userCustomer.user_customer_alamat = data.user_customer_alamat
        userCustomer.customer_perusahaan_id = data.customer_perusahaan_id
        userCustomer.customer_role_id = data.customer_role_id

        await userCustomer.save()
        return response.json(userCustomer)
    }

    async destroy({ params, request, response }) {
        let userCustomer = await UserCustomer.find(params.id)
        userCustomer.delete()
        return response.json({ message: 'User customer berhasil dihapus' })
    }
}

module.exports = UserCustomerController
