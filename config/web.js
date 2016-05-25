/**
 * Server Configuration
 * (app.config.web)
 *
 * Configure the Web Server
 *
 * @see {@link http://trailsjs.io/doc/config/web}
 */

const path = require('path')

module.exports = {

  /**
   * The port to bind the web server to
   */
  port: process.env.PORT || 3000,

  views: {
    engines: {
      html: require('handlebars')
    },
    path: 'views'
  }

}