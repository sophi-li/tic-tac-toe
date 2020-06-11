const assert = require('assert')
const script = require('./script')

it('game board is an array with 9 indices', () => {
  assert.equal(script.gameState.length, 8)
})
