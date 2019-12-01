'use strict'

const UserCustomer = use('App/Models/UserCustomer')
const CustomerToken = use('App/Models/CustomerToken')
const Mail = use('Mail')

class UserCustomerController {
    async login({ request, auth }) {
        let user_email = request.input('user_email')
        let user_password = request.input('user_password')
        let auth_data = await auth
            .authenticator('customer')
            .query((query) => {
                query.where('user_customer_status', 1)
            })
            .withRefreshToken()
            .attempt(user_email, user_password)
        let dataUser = await UserCustomer
            .findBy('user_customer_email', user_email)

        return {
            auth: auth_data,
            customer: dataUser
        }
    }

    async register({ request, auth, response }) {
        let userCustomer = new UserCustomer()
        let tokenCustomer = new CustomerToken()

        let data = {
            user_customer_nama: request.input('user_customer_nama'),
            user_customer_email: request.input('user_customer_email'),
            user_customer_password: request.input('user_customer_password'),
            user_customer_telepon: request.input('user_customer_telepon'),
            user_customer_alamat: request.input('user_customer_alamat'),
            user_customer_status: request.input('user_customer_status'),
            customer_perusahaan_id: request.input('customer_perusahaan_id'),
            customer_role_id: request.input('customer_role_id')
        }

        userCustomer.user_customer_nama = data.user_customer_nama
        userCustomer.user_customer_email = data.user_customer_email
        userCustomer.user_customer_password = data.user_customer_password
        userCustomer.user_customer_telepon = data.user_customer_telepon
        userCustomer.user_customer_alamat = data.user_customer_alamat
        user_customer_status: request.input('user_customer_status') || 0,
            userCustomer.customer_perusahaan_id = data.customer_perusahaan_id
        userCustomer.customer_role_id = data.customer_role_id

        userCustomer = await userCustomer.save()
        let thisCustomer = await UserCustomer.findBy('user_customer_email', data.user_customer_email)
        let accessToken = await auth.authenticator('customer').generate(thisCustomer)

        tokenCustomer.user_customer_id = thisCustomer.user_customer_id
        tokenCustomer.token = accessToken.token
        tokenCustomer.type = "confimation-token"
        tokenCustomer.is_revoked = false
        await tokenCustomer.save()

        await Mail.send('email-confirmation', { data, accessToken }, (message) => {
            message
                .to(data.user_customer_email)
                .from('support@calibrapps-lab.site')
                .subject('[Confirmation] Account Calibrapps Lab')
        })

        return response.json({ "customer": userCustomer, "access_token": accessToken })
    }

    async accountVerification({ params, response }) {
        let dataToken = await CustomerToken.query().where('token', params.token).first()
        let confirm = await UserCustomer
            .query()
            .where('user_customer_id', dataToken.user_customer_id)
            .update({ user_customer_status: 1 })

        dataToken.is_revoked = true
        await dataToken.save()

        if (confirm) {
            return response.json({ message: "berhasil verifikasi" })
        } else {
            return response.json({ message: "verifikasi tidak berhasil" })
        }
    }

    async forgotPassword({ auth, request, response }) {
        let tokenCustomer = new CustomerToken()
        let thisCustomer = await UserCustomer.findBy('user_customer_email', request.input('user_customer_email'))
        let accessToken = await auth.authenticator('customer').generate(thisCustomer)

        tokenCustomer.user_customer_id = thisCustomer.user_customer_id
        tokenCustomer.token = accessToken.token
        tokenCustomer.type = "forgot-password"
        tokenCustomer.is_revoked = false

        await tokenCustomer.save()

        await Mail.send('forgot-password', { thisCustomer, accessToken }, (message) => {
            message
                .to(thisCustomer.user_customer_email)
                .from('support@calibrapps-lab.site')
                .subject('[Reset Password] Account ' + thisCustomer.user_customer_nama + ' Calibrapps Lab')
        })

        return response.json({ "customer": thisCustomer, "access_token": accessToken })
    }

    async changePassword({ params, request, response }) {
        try {
            let dataToken = await CustomerToken
                .query()
                .where('token', params.token)
                .first()

            let id_user_customer = dataToken.user_customer_id
            let thisCustomer = await UserCustomer.findOrFail(id_user_customer)

            let data = {
                new_password: request.input('new_password'),
                new_password_verification: request.input('new_password_verification')
            }

            dataToken.is_revoked = true
            thisCustomer.user_customer_password = data.new_password
            await thisCustomer.save()
            await dataToken.save()
            return response.send("Reset password successfully")
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'User tidak dapat ditemukan'
                })
            }
        }
    }

    async logout({ auth, response }) {
        let apiToken = auth.getAuthHeader()
        await auth.authenticator('customer').revokeTokens([apiToken])
        return response.send({ message: 'berhasil logout!' })
    }
}

module.exports = UserCustomerController
