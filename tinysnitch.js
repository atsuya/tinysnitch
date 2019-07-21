'use strict'

const readline = require('readline')
const { Resolver } = require('dns').promises

const UfwLogLineParser = require('./ufw-log-line-parser')

const resolver = new Resolver()
const ufwLogLineParser = new UfwLogLineParser()

const rl = readline.createInterface({
  input: process.stdin,
})
rl.on('line', async (line) => {
  //console.log(`received: ${line}`)

  try {
    const message = await ufwLogLineParser.parse(line)
    //console.log(message)
    if (message.get('PROTO') !== 'TCP') {
      return
    }

    const destinationIp = message.get('DST')
    const domains = await resolver.reverse(destinationIp)
    console.log(`${domains.join(',')} [${destinationIp}]`)
  } catch (exception) {
    console.log(`Failed to parse: ${exception.message}`)
  }
})

process.on('SIGINT', () => {
  console.log('SIGINT detected, exiting.')
  process.exit()
})
