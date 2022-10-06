import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const style = {
    marginBottom: 10,
  }

  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
