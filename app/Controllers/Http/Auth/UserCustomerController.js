'use strict'

class UserCustomerController {
    async login({ request, auth }){
        let user_email = request.input('user_email')
        let user_password = request.input('user_password')

        return auth
            .authenticator('customer')
            .withRefreshToken()
            .attempt(user_email, user_password)
    }

    async logout({auth, response}){
        let apiToken = auth.getAuthHeader()
        await auth.authenticator('customer').revokeTokens([apiToken])
        return response.send({message : 'berhasil logout!'})
    }
}

module.exports = UserCustomerController
