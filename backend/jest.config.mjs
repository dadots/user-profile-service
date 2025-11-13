/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        // redirect .js imports to .ts for Jest
        '^(\\.{1,2}/routes/.*)\\.js$': '$1',
    },
};
