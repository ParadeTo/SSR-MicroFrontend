const express = require('express')
const fetch = require('node-fetch')
const {JSDOM} = require('jsdom')

const app = express()

async function getContent(url) {
  const rsp = await fetch(url)
  const code = await rsp.text()
  const wrapper = new Function('require, exports, module', code)
  wrapper(require, module.exports, module)
  return module.exports.renderOnServerSide().content
}

async function insertResources(manifestUrl, prefix, templateDoc) {
  let dom = new JSDOM('<!DOCTYPE html>'),
    doc = dom.window.document
  const rsp = await fetch(manifestUrl)
  const cnt = await rsp.text()
  const data = JSON.parse(cnt)
  for (const k in data) {
    if (/css?$/.test(k)) {
      const link = doc.createElement('link')
      link.href = `${prefix}${data[k]}`
      link.rel = 'stylesheet'
      link.type = 'text/css'
      templateDoc.head.appendChild(link)
    } else if (/js?$/.test(k)) {
      const script = doc.createElement('script')
      script.src = `${prefix}${data[k]}`
      templateDoc.body.appendChild(script)
    }
  }
}

app.get('/', async (req, res) => {
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

  const templateDoc = templateDOM.window.document
  try {
    // nav
    const navContent = await getContent(
      'http://localhost:8080/navbar/dist/server.js'
    )
    // app1
    const app1Content = await getContent(
      'http://localhost:8080/app1/dist/server.js'
    )
    templateDoc.querySelector('#navbar').innerHTML = navContent
    templateDoc.querySelector('#app1').innerHTML = app1Content

    // css js resources
    await insertResources(
      'http://localhost:8080/app1/dist/manifest.json',
      'http://localhost:8080',
      templateDoc
    )
    await insertResources(
      'http://localhost:8080/navbar/dist/manifest.json',
      'http://localhost:8080',
      templateDoc
    )
    console.log(templateDOM.serialize())
    res.end(templateDOM.serialize())
  } catch (error) {
    console.log(error)
  }
})

app.listen(8000)
