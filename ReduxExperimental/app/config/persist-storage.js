import { AsyncStorage } from 'react-native';

const AUTH_KEY = 'auth';

const DefaultConfig = {
  storage: AsyncStorage
};

const buildConfig = options => ({
  ...DefaultConfig,
  ...options
});

export default { buildConfig, AUTH_KEY };
