const { renderFile, render } = require('ejs')
const path = require('path').resolve()
const express = require('express')
const chalk = require('chalk')
const app = express()

const community = require('./tools/status')


app.use('/src', express.static(path + '/src'))
app.get('/', async (req, res) => {
  community().then((result) => {
    renderFile(path + '/page/index.ejs', { list: result }, (err, str) => {
      if (err) res.status(500).send('Internal Server Error\n' + err)
      res.send(str)
    })
  })
})

app.listen(8011, () => {
  console.log(chalk.bgWhite.black('Server OPEN : http://localhost:8011'))
})
