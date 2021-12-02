const { alias, aliasJest } = require('react-app-rewire-alias')

const aliasMap = {
  '@components': 'src/components',
  '@consts': 'src/domain/consts',
  '@interfaces': 'src/domain/interfaces',
  '@mytypes': 'src/domain/types',
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)