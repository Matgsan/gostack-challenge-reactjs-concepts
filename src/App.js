import React from "react";

import "./styles.css";
import api from "./services/api";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    async function loadRepositories(){
      const response = await api.get('/repositories');
      setRepositories(response.data)
    }
    loadRepositories();
  }, [])
  
  async function handleAddRepository() {
    const response = await api.post(`/repositories`, {
      title: 'Teste',
      url: 'Teste',
      techs: ['Teste']
    });
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repo=>repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item =>(
            <li key={item.id}>
              {item.title}

              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
