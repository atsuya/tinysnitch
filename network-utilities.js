'use strict'

const os = require('os')

/**
 * NetworkUtilities provides useful methods.
 */
class NetworkUtilities {
  /**
   * Retrieves a list of IP addresses assigned to network interfaces.
   */
  static async localIps() {
    const ips = []

    const networkInterfaces = os.networkInterfaces()
    console.log(networkInterfaces)
    Object.keys(networkInterfaces).forEach((name) => {
      networkInterfaces[name].forEach((networkInterface) => {
        if (networkInterface.family === 'IPv4') {
          ips.push(networkInterface.address)
        }
      })
    })

    return ips
  }
}

module.exports = NetworkUtilities
