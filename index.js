const fetch = require('node-fetch')

async function getReplLangs(username, repl) {
  let info = await fetch(`https://staging.repl.it/data/repls/@${username}/${repl}`, {
    method: `GET`,
    headers: {
      'User-Agent': 'ReplLangChecker'
    }
  }).then(res => res.json()); 

  console.log(info)
}

getReplLangs('elipie', 'e-2')
