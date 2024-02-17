module.exports={
  bail: true, //serve para quando 1 teste falhar ele para os testes
  coverageProvider: "v8",
  testMatch: [
    "<rootDir>/src/**/*spec.js"//aonde vai fazer os testes, o * serve paraq indicar qualquer none
  ],
}
