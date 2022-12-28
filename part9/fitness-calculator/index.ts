import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express()

app.get('/hello', (req, res) => {
  console.log(req.query)
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  const invalidParams: boolean = isNaN(Number(height)) || isNaN(Number(weight))

  if (invalidParams) {
    res.status(400).send({ error: 'malformatted parameters' })
  }

  const result = calculateBmi(Number(height), Number(weight))
  res.json({
    weight: Number(weight),
    height: Number(height),
    bmi: result,
  })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
