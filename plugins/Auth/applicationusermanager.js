import { UserManager } from 'oidc-client'

class ApplicationUserManager extends UserManager {
  constructor () {
    super({
      authority: 'https://ids.neters.club',
      client_id: 'tibugnuxtjs',
      redirect_uri: 'http://tibug.neters.club/callback',
      response_type: 'id_token token',
      scope: 'openid profile roles blog.core.api',
      post_logout_redirect_uri: 'http://tibug.neters.club'
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
