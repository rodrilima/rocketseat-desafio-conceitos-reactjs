import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => { api.get('/repositories').then(({ data })=>setRepositories(data)) }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories',{ "title": `Rocketseat ${Date.now()}` })
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`/repositories/${id}`)
    if(status === 204) setRepositories([...repositories.filter(repository => repository.id !== id)])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=>(
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
