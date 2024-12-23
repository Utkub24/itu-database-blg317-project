import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PokemonCard from './lib/components/PokemonCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col gap-4'>
      <h1> Pokemon App </h1>
      <PokemonCard />
    </div>
  )
}

export default App
