// Load ts-node so Sequelize CLI can execute TypeScript migrations.
require('ts-node/register/transpile-only');

// Prefer compiled config when available, then fall back to the TS source.
try {
  module.exports = require('./dist/database/config/config').default;
} catch {
  module.exports = require('./src/database/config/config.ts').default;
}
