const express = require('express')
const fetch = require('node-fetch')
const {JSDOM} = require('jsdom')

const app = express()

const templateDOM = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSR + MicroFrontend</title>
  </head>
  <body>
    <div id="navbar"></div>
    <div id="app1"></div>
  </body>
</html>
`)

async function getContent(url) {
  const rsp = await fetch(url)
  const code = await rsp.text()
  const wrapper = new Function('require, exports, module', code)
  wrapper(require, module.exports, module)
  return module.exports.renderOnServerSide().content
}

app.get('/', async (req, res) => {
  try {
    // nav
    const navContent = await getContent(
      'http://localhost:8080/navbar/build/server.js'
    )
    // app1
    const app1Content = await getContent(
      'http://localhost:8080/app1/build/server.js'
    )
    console.log(navContent, app1Content)
    templateDOM.window.document.querySelector('#navbar').innerHTML = navContent
    templateDOM.window.document.querySelector('#app1').innerHTML = app1Content
    res.end(templateDOM.serialize())
  } catch (error) {
    console.log(error)
  }
})

app.listen(8000)
