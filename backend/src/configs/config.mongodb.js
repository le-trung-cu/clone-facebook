const config = {
  pro: {
    app: {
      port: process.env.PRO_APP_PORT
    },
    db: {
      host: process.env.PRO_DB_HOST,
      port: process.env.PRO_DB_PORT,
      name: process.env.PRO_DB_NAME,
    }
  },
  dev: {
    app: {
      port: process.env.DEV_APP_PORT
    },
    db: {
      host: process.env.DEV_DB_HOST,
      port: process.env.DEV_DB_PORT,
      name: process.env.DEV_DB_NAME,
    }
  }
}

module.exports = config[process.env.NODE_ENV]