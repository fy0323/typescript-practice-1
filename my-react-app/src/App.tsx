//import { useState } from 'react'
import Profile from './components/Profile.tsx'
import Counter from './components/Counter.tsx'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div>
      <Profile name="山田太郎" bio="フロントエンドエンジニア"/>
      <Profile name="鈴木花子" bio="バックエンドエンジニア"/>
      <Counter />
    </div>
  )
}

export default App
