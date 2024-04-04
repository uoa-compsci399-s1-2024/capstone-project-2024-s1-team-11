const MemRepoAdapter = require("./mem-repository/mem-repo-adapter");

let repo = new MemRepoAdapter();

module.exports = repo;