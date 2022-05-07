import { useState } from "react"
import Navigation from "components/navigation"
import styled from "styled-components"
import useLocalStorage from "hooks/useLocalStorage"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 0 10px;
`

const CommandCategory = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  & > * {
    margin: auto 0;
  }
`

function App() {
  const [ password, setPassword ] = useLocalStorage("password")
  const [ success, setSuccess ] = useState(null)
  const [ error, setError ] = useState(null)

  const verify = async (event) => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    })

    const { status } = response
    const data = await response.json()

    if (status === 200) {
      setSuccess(data.message)
      setError(null)
    } else {
      setSuccess(null)
      setError(data.message)
    }
  }

  const handleRestart = async (event) => {
    const response = await fetch("/api/restart-server", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    })

    const { status } = response
    const data = await response.json()

    if (status === 200) {
      setSuccess(data.message)
      setError(null)
    } else {
      setSuccess(null)
      setError(data.message)
    }
  }

  return (
    <div className="App">
      <Navigation/>

      <Container>
        <form>
          <label for="password"><b>password: </b></label>
          <input
            name="smp-password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
        { success && <p className="success">{ success }</p> }
        { error && <p className="error">{ error }</p> }
        <CommandCategory>
          <button onClick={verify}>verify password</button>
        </CommandCategory>
        <CommandCategory>
          <button onClick={handleRestart}>restart server</button>
        </CommandCategory>
      </Container>
    </div>
  )
}

export default App
