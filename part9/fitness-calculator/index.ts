import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'
const app = express()

app.use(express.json())

app.get('/hello', (_req, res) => {
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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body
  console.log(daily_exercises, target)

  const missingParams: boolean = !daily_exercises || !target
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const invalidParams: boolean =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isNaN(target) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    daily_exercises.forEach((num: number) => {
      isNaN(num)
    })

  if (invalidParams) {
    res.status(400).json({
      error: 'malformatted parameter(s)',
    })
  }

  if (missingParams) {
    res.status(400).json({
      error: 'parameter(s) missing',
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
  const result = calculateExercises([target, ...daily_exercises])

  res.json(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
