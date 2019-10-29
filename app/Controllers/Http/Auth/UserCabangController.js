'use strict'

const User = use('App/Models/UserCabang')

class UserCabangController {
    
    async login({ request, auth }){
        let user_email = request.input('user_email')
        let user_password = request.input('user_password')
        let auth_data = await auth
        .authenticator('user')
        .withRefreshToken()
        .attempt(user_email, user_password)
        let user_data = await User.query().where('user_cabang_email', user_email).with('kantorCabang').with('userRole').first()
        return {
            auth : auth_data,
            user_data : user_data
        }
    }

    async logout({auth, response}){
        let apiToken = auth.getAuthHeader()
        await auth.authenticator('user').revokeTokens([apiToken])
        return response.send({message : 'berhasil logout!'})
    }

}

module.exports = UserCabangController
