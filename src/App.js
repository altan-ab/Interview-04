import React, { createContext, useContext, useEffect, useState } from 'react'
import './styles.css'

const AllContext = createContext()

function App() {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const users = Object.keys(userState)
      const randomUser = users[Math.floor(Math.random() * users.length)]
      setUserState((prevUserState) => ({
        ...prevUserState,
        [randomUser]: !prevUserState[randomUser], // Durumu tersine çevir
      }))
    }, 2000) // 2 saniyede bir güncelle

    return () => clearInterval(interval) // Temizlik için interval'i kaldır
  }, [userState])

  return (
    <AllContext.Provider value={{ userState, setUserState }}>
      <div className="App">
        <h1>Kullanıcı Durumları</h1>
        <UserList />
      </div>
    </AllContext.Provider>
  )
}

const UserList = () => {
  const { userState } = useContext(AllContext)

  return (
    <ul>
      {Object.keys(userState).map((user) => (
        <li key={user}>
          {user}: {userState[user] ? '🟢' : '🔴'}
        </li>
      ))}
    </ul>
  )
}

export default App
