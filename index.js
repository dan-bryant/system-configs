const Promise = require('bluebird');
const GitHubApi = require("github");
const github = new GitHubApi({Promise: Promise});
const readlineSync = require('readline-sync');

var userid = readlineSync.question('github userid: ');
var password = readlineSync.question('github password: ', {
   hideEchoBack: true
});

github.authenticate({
   type: "basic", 
   username: userid, 
   password: password
});

github.gists.getAll({
   per_page: 100
}).then((res) => {
   if((res.data||{}).forEach) {
      res.data.forEach((item) => {
         console.log(item.description);
      });
   }
});