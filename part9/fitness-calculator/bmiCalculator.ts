export const calculateBmi = (height: number, weight: number): string => {
  const result = weight / (height / 100) ** 2
  if (result < 18) {
    return 'Underweight'
  } else if (result < 25 && result > 18) {
    return 'Normal (healthy) weight'
  }
  return 'Overweight'
}

// export const parseQuery = ({
//   height,
//   weight,
// }: {
//   height: string
//   weight: string
// }) => {
//   if (isNaN(Number(height)) || isNaN(Number(weight))) {
//     throw new Error('One or more provided values was not a number!')
//   } else {
//     return {
//       height: Number(height),
//       weight: Number(weight),
//     }
//   }
// }

// const parseArguments = (args: Array<string>) => {
//   if (args.length < 4) throw new Error('Not enough arguments!')
//   if (args.length > 4) throw new Error('Too many arguments!')

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       h: Number(args[2]),
//       w: Number(args[3]),
//     }
//   } else {
//     throw new Error('Provided values were not numbers!')
//   }
// }

// try {
//   const { h, w } = parseArguments(process.argv)
//   calculateBmi(h, w)
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message
//   }
//   console.log(errorMessage)
// }
