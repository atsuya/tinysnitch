'use strict'

/**
 * UfwLogLine represents a line log in JSON retrieved from journalctl.
 */
class UfwLogLine {
  /**
   * @param {string} line A line in JSON.
   */
  constructor(line) {
    this.line = line
  }

  /**
   * Returns a source IP.
   * @return {string} Source IP.
   */
  sourceIp() {
  }
}

module.exports = UfwLogLine
