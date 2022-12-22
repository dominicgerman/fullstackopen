const calculateBmi = (height: number, weight: number): number => {
  const result = weight / (height / 100) ** 2
  if (result > 25) {
    console.log(`Your BMI: ${result} -- You are overweight.`)
  } else if (result < 18) {
    console.log(`Your BMI: ${result} -- You are underweight.`)
  } else if (result < 25 && result > 18) {
    console.log(`Your BMI: ${result} -- You are a normal (healthy) weight.`)
  }
  return result
}

const parseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments!')
  if (args.length > 4) throw new Error('Too many arguments!')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      h: Number(args[2]),
      w: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

try {
  const { h, w } = parseArguments(process.argv)
  calculateBmi(h, w)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
