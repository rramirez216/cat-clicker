const express = require('express')
const { pool } = require('./db')
const cors = require('cors')
const app = express()
const port = 5200

app.use(cors())
app.use(express.json())

app.get('/sound', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT purrs FROM sound')
    res.json(rows[0])
  } catch (error) {
    res.status(500).send(error)
  }
})

app.put('/sound', async (req, res) => {
  try {
    const { purrs } = req.body
    console.log(req.body)
    const incrementedPurrs = await pool.query(
      'UPDATE sound SET purrs = $1 where sound_id = 1 RETURNING purrs',
      [purrs]
    )
    res.json(incrementedPurrs.rows[0])
  } catch (err) {
    res.status(500).send(err)
    console.error(err)
  }
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(port, () => {
  console.log(`listening for the purrs on port ${port}`)
})
