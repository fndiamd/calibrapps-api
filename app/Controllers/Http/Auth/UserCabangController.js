'use strict'

const User = use('App/Models/UserCabang')

class UserCabangController {
    
    async login({ request, auth }){
        let user_email = request.input('user_email')
        let user_password = request.input('user_password')

        return auth
            .authenticator('user')
            .withRefreshToken()
            .attempt(user_email, user_password)
    }

    async logout({auth, response}){
        let apiToken = auth.getAuthHeader()
        await auth.authenticator('user').revokeTokens([apiToken])
        return response.send({message : 'berhasil logout!'})
    }

}

module.exports = UserCabangController
