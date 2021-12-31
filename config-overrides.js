const { alias, aliasJest } = require('react-app-rewire-alias')

const aliasMap = {
  '@components': 'src/components',
  '@hooks': 'src/hooks',
  '@consts': 'src/domain/consts',
  '@interfaces': 'src/domain/interfaces',
  '@mytypes': 'src/domain/types',
  '@enums': 'src/domain/enums',
  '@services': 'src/domain/services',
  '@utils': 'src/domain/utils',
  '@payloads': 'src/domain/payloads',
  '@store': 'src/store',
  '@localbase': 'src/localbase',
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)