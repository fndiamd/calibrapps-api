'use strict'

const User = use('App/Models/User')

class AuthUserController {
    async register({ request, auth, response }) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let user = new User()
        user.username = username
        user.email = email
        user.password = password

        user = await user.save()
        let thisuser = await User.findBy('email', email)
        let accessToken = await auth.generate(thisuser)
        return response.json({ "user": user, "access_token": accessToken })
    }

    async login({ request, auth, response }) {
        const email = request.input('email')
        const password = request.input('password')
        
        return auth.withRefreshToken().attempt(email, password)
        
    }
}

module.exports = AuthUserController
