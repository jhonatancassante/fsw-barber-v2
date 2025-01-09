export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
export const transform = {
    '^.+\\.(ts|tsx)$': 'ts-jest',
};
export const testMatch = ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'];
export const globals = {
    'ts-jest': {
        tsconfig: 'tsconfig.json',
    },
};
