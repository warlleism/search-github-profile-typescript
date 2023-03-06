
import { useGitProfile } from './hooks/useGitProfile';
import './style.scss'
import { useState } from 'react';

type InputName = {
  name: string
}

const initialFormData: InputName = {
  name: "",
};

function App() {

  const { response, error, setUser } = useGitProfile({ param: 'warlleism' })

  const [name, setName] = useState<InputName>(initialFormData);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setName((_) => ({
      [name]: value
    }));
  }

  return (
    <div className="App">
      {response.message ? <div style={{ marginTop: '30px' }}>usuário não encontrado.</div> : false}
      {error ? <div style={{ marginTop: '30px' }}>Ops! algo deu errado</div> : false}
      <div className='container-input'>
        <input type="text" name='name' onChange={handleInput} />
        <div className='button' onClick={() => setUser(name.name)}>Buscar</div>
      </div>
      {
        response.message
          ?
          false
          :
          <div className='container-data'>
            <img src={response.avatar_url} alt="" />
            <div>{response.name}</div>
            <div>Seguidores: {response.followers}</div>
            <div>Seguindo: {response.following}</div>
            <div>{response.location}</div>
          </div>
      }
    </div>
  )
}

export default App
