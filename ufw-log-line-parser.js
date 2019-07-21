'use strict'

/**
 * UfwLogLineParser parses a ufw log line in JSON retrieved from journalctl.
 */
class UfwLogLineParser {
  /**
   * Parses a line in JSON.
   * @param {string} line A line in JSON.
   * @return {Map<string, !Object>} An object represenation of MESSAGE field.
   */
  async parse(line) {
    try {
      const log = await this.parseJournalctlLogLine(line)
      if (!Object.prototype.hasOwnProperty.call(log, 'MESSAGE')) {
        throw new Error('MESSAGE field is missing')
      }

      return await this.parseMessage(log['MESSAGE'])
    } catch (exception) {
      throw new Error(`Failed to parse ufw log line: ${exception.message}`)
    }
  }

  /**
   * @private
   */
  async parseJournalctlLogLine(line) {
    try {
      return JSON.parse(line)
    } catch (exception) {
      throw new Error(`Parsing a line in JSON failed: ${exception.message}`)
    }
  }

  /**
   * @private
   */
  async parseMessage(message) {
    // [UFW AUDIT] IN=wlp2s0 OUT= MAC=a0:c5:89:1b:e9:46:88:1f:a1:2a:fd:22:08:00
    // SRC=172.217.26.3 DST=10.0.1.20 LEN=52 TOS=0x00 PREC=0x00 TTL=121
    // ID=18904 PROTO=TCP SPT=80 DPT=38848 WINDOW=240 RES=0x00 ACK URGP=0 "

    // the key from the key-value pair can actually contain space.
    // this means simply splitting doesn't correctly work, but i'll ignore it
    // since important key-value pairs work with it.
    const segments = message.split(/\s/)

    const result = new Map()
    segments.forEach((segment) => {
      const pair = segment.split(/=/)
      if (pair.length === 2) {
        const key = pair[0].trim()
        const value = pair[1].trim()

        result.set(key, value)
      }
    })

    return result
  }
}

module.exports = UfwLogLineParser
