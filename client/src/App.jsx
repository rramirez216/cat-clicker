import React from 'react'
import Goblin from './assets/goblin.png'
import useSWR from 'swr'

const ENDPOINT = 'http://localhost:5200/sound'
const fetcher = async (endpoint) => {
  const response = await fetch(endpoint, { method: 'GET' })
  const json = await response.json()

  return json
}

function App() {
  const [count, setCount] = React.useState(0)
  const [percent, setPercent] = React.useState(100)
  const [earned, setEarned] = React.useState(0)

  // const { data, error } = useSWR(ENDPOINT, fetcher)

  React.useEffect(() => {
    const fetchOnMount = async () => {
      // try {
      //   const response = await fetch(ENDPOINT, { method: 'GET' })
      //   const json = await response.json()
      //   console.log(json)
      // } catch (err) {
      //   console.error(err)
      // }

      try {
        const response = await fetcher(ENDPOINT)

        setEarned(response.purrs)
      } catch (error) {
        console.error(error)
      }
    }
    fetchOnMount()
  }, [])

  const updateDataOnClick = async (increment) => {
    console.log('updating')
    setEarned(increment)
    // console.log(increment)
    try {
      const response = await fetch('http://localhost:5200/sound', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purrs: increment,
        }),
      })

      const json = await response.json()
      // console.log('Server response', json)
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const handleClick = () => {
    const nextCount = count + 1
    const dataIncrement = earned + 1
    const nextPercent = percent - 20
    if (nextCount > 5) {
      setCount(0)
      setPercent(100)
      updateDataOnClick(dataIncrement)
    } else {
      setCount(nextCount)
      setPercent(nextPercent)
    }
  }

  let totalPurrs = earned || ''
  console.log(percent)

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className='w-36'>
        <img src={Goblin} alt='' />
      </div>
      <div className='centered-col gap-4'>
        <h1 className='font-bold text-5xl'>Cat Clicker</h1>
        <button
          className='border border-black rounded-full relative overflow-hidden'
          onClick={() => handleClick()}
        >
          <span>Purrs Earned: {totalPurrs}</span>
          <div
            className={`w-full h-full bg-red-400 absolute top-[${percent}%]`}
          ></div>
        </button>
        <div>{count}</div>
      </div>
    </div>
  )
}

export default App
