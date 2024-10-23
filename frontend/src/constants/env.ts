const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing enviroment variable ${key}`);
  }

  return value;
};

export const REACT_APP_STRIPE_SECRET = getEnv("REACT_APP_STRIPE_SECRET");
// export const VITE_API_URL = getEnv("VITE_API_URL");
