import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(4000),
    DATABASE_URL: Joi.string().required().description('Database URL'),
    REDIS_URL: Joi.string().required().description('Redis URL'),
    BEACON_URL: Joi.string().required().description('Beacon URL'),
    DUNE_API_KEY: Joi.string().required().description('Dune API Key'),
    ETHERSCAN_API_KEY: Joi.string().required().description('Etherscan API Key'),
    BYBIT_API_KEY: Joi.string().required().description('Bybit API Key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  redisUrl: envVars.REDIS_URL,
  beaconUrl: envVars.BEACON_URL,
  duneApiKey: envVars.DUNE_API_KEY,
  etherscanApiKey: envVars.ETHERSCAN_API_KEY,
  bybitApiKey: envVars.BYBIT_API_KEY,
};

export default config;
