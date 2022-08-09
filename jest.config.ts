export default {
    preset: 'ts-jest',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    globals: {
        "ts-jest": {
            isolatedModules: true
        }
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};