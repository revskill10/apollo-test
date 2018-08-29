module.exports = {
  babel: {
    plugins: [
      "import-graphql",
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
  },
  assumeNoImportSideEffects: true,
}
