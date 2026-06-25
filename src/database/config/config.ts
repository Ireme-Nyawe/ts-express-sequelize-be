import dotenv from 'dotenv';
dotenv.config();

// Geeting database configuration from environment variables
const {
  DEV_DATABASE_NAME,
  DEV_DATABASE_USER,
  DEV_DATABASE_PASSWORD,
  DEV_DATABASE_HOST,
  DEV_DATABASE_PORT,
  DATABASE_CA,
  DB_SSL
} = process.env;

const useSSL = DB_SSL !== 'false';

interface DBConfig {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: string | number;
  dialect: 'postgres';
  use_env_variable?: string;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized?: boolean;
      ca?: any;
    };
  };
}

interface Config {
  development: DBConfig;
  production: DBConfig;
  test: DBConfig;
}

const config: Config = {
  development: {
    username: DEV_DATABASE_USER,
    password: DEV_DATABASE_PASSWORD,
    database: DEV_DATABASE_NAME,
    host: DEV_DATABASE_HOST,
    port: DEV_DATABASE_PORT,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ...(useSSL && {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
          ...(DATABASE_CA && { ca: DATABASE_CA })
        }
      }
    })
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

export default config;
