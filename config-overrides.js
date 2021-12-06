const { alias, aliasJest } = require('react-app-rewire-alias')

const aliasMap = {
  '@components': 'src/components',
  '@consts': 'src/domain/consts',
  '@interfaces': 'src/domain/interfaces',
  '@mytypes': 'src/domain/types',
  '@services': 'src/domain/services',
  '@utils': 'src/domain/utils',
  '@store': 'src/store',
  '@localbase': 'src/localbase',
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)