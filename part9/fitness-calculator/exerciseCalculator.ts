interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (args: Array<number>): Result => {
  const periodLength = args.length - 1
  const trainingDays = args.slice(1).filter((num) => num > 0).length
  const totalHours = args
    .slice(1)
    .reduce((acc, currentValue) => acc + currentValue, 0)
  const average = totalHours / periodLength
  const target = args[0]
  const success = average >= target ? true : false
  let rating = 2
  if (success) {
    rating = 3
  } else if (average < target - 1) {
    rating = 1
  }
  let ratingDescription = ''
  if (rating === 1) {
    ratingDescription = 'Not great Bob.'
  }
  if (rating === 2) {
    ratingDescription = 'Good but could be better.'
  }
  if (rating === 3) {
    ratingDescription = `Now we're talking!`
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

const parseArgs = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments!')
  if (args.length > 12) throw new Error('Too many arguments!')
  if (isNaN(Number(args[2])))
    throw new Error('Provided value for "target" is not a number!')

  let target: number = Number(args[2])
  const values = args.slice(3).map((val) => Number(val))
  values.forEach((num) => {
    if (isNaN(num)) {
      throw new Error('Provided values were not numbers')
    }
  })
  return [target, ...values]
}

try {
  const parsedData: Array<number> = parseArgs(process.argv)
  console.log(calculateExercises(parsedData))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
// console.log(calculateExercises([0, 0, 2, 1, 0, 0, 1]))
