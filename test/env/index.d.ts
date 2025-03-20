interface Environment {
    setup(): Promise<void>;
    teardown(): Promise<void>;
}

declare const module: Environment;

export = module;
