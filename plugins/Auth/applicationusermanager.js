import { UserManager } from 'oidc-client'

class ApplicationUserManager extends UserManager {
  constructor () {
    super({
      authority: 'http://localhost:5004',
      client_id: 'tibugnuxtjs',
      redirect_uri: 'http://localhost:3089/callback',
      response_type: 'id_token token',
      scope: 'openid profile roles blog.core.api',
      post_logout_redirect_uri: 'http://localhost:3089'
    })
  }

  async login () {
    debugger
    await this.signinRedirect()
    return this.getUser()
  }

  async logout () {
    debugger
    return this.signoutRedirect()
  }
}

const applicationUserManager = new ApplicationUserManager()
export { applicationUserManager as default }
