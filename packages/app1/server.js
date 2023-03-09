const express = require('express')
require('isomorphic-fetch')
const {renderAppToPipeableStream} = require('./src/server.entry')
const {JSDOM} = require('jsdom')
import {Writable} from 'stream'

const app = express()

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
    <div id="app1"><!-- app1 --></div>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  </body>
</html>
`)
  const templateDoc = templateDOM.window.document

  // css js resources
  await insertResources(
    'http://localhost:8080/app1/dist/manifest.json',
    'http://localhost:8080',
    templateDoc
  )
  const html = templateDOM.serialize()
  const [head, tail] = html.split('<!-- app1 -->')

  const stream = new Writable({
    write(chunk, _encoding, cb) {
      res.write(chunk, cb)
    },
    final() {
      res.end(tail)
    },
  })

  const {pipe} = renderAppToPipeableStream({
    onShellReady() {
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = 200
      res.write(head)
      pipe(stream)
    },
  })
})

app.get('/json', (req, res) => {
  setTimeout(() => {
    res.json({name: 'ayou'})
  }, 5000)
})

app.listen(9000)
