interface Config {
    NETWORK_NAME: string;
    BROWSER_IMAGE: string;
    BROWSER_CONTAINER_NAME: string;
    BROWSER_PORT: string;
    BROWSER_WS_ENDPOINT: string;
    BROWSER_TOKEN: string;
    NGINX_IMAGE: string;
    NGINX_CONTAINER_NAME: string;
    NGINX_PORT: string;
    TEST_APP_ENDPOINT: string;
}

declare const module: Config;

export = module;
