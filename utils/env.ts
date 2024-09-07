interface EnvVariables {
    STRAVA_CLIENT_ID: string;
    STRAVA_CLIENT_SECRET: string;
    APP_HOME_URL: string;
    STRAVA_CALLBACK_URL: string;
    STRAVA_NEW_LOGIN: string;
    STRAVA_FETCH_TOKEN: string;
    NODE_ENV: string;
}

const getEnv = (key: keyof EnvVariables): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

export const env = {
    STRAVA_CLIENT_ID: getEnv("STRAVA_CLIENT_ID"),
    STRAVA_CLIENT_SECRET: getEnv("STRAVA_CLIENT_SECRET"),
    APP_HOME_URL: getEnv("APP_HOME_URL"),
    NODE_ENV: getEnv("NODE_ENV"),
    STRAVA_CALLBACK_URL: getEnv("STRAVA_CALLBACK_URL"),
    STRAVA_NEW_LOGIN: getEnv("STRAVA_NEW_LOGIN"),
    STRAVA_FETCH_TOKEN: getEnv("STRAVA_FETCH_TOKEN"),
};
