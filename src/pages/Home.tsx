import { useNavigate } from 'react-router-dom';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';

export function Home () {
  const { signInWithGoogle, user} = useAuth();

  let navigate = useNavigate();

  async function handleCreateRoom () {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/rooms/new');
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>
            Ou entre em uma sala
          </div>
          <form>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              name="" 
              id="" 
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}