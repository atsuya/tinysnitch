'use strict'

const readline = require('readline')
const { Resolver } = require('dns').promises

const UfwLogLineParser = require('./ufw-log-line-parser')
const NetworkUtilities = require('./network-utilities')

const resolver = new Resolver()
const ufwLogLineParser = new UfwLogLineParser()

const rl = readline.createInterface({
  input: process.stdin,
})

process.on('SIGINT', () => {
  console.log('SIGINT detected, exiting.')
  process.exit()
})

/**
 * Main.
 */
async function main() {
  const localIps = await NetworkUtilities.localIps()
  console.log(localIps)

  rl.on('line', async (line) => {
    //console.log(`received: ${line}`)

    try {
      const message = await ufwLogLineParser.parse(line)

      const destinationIp = message.get('DST')
      if (localIps.includes(destinationIp)) {
        //console.log(`skipping: destination=${destinationIp}, ${localIps.join(',')}`)
        return
      }

      const domains = await resolver.reverse(destinationIp)
      console.log(`${domains.join(',')} [${destinationIp}]`)
    } catch (exception) {
      //console.log(`Failed to parse: ${exception.message}`)
    }
  })
}
main()
