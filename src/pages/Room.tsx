import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss';
import { RoomCode } from './../components/RoomCode';

type RoomParams = { 
  id: string;
}

export function Room () {
  const { id } = useParams<RoomParams>();
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');

  async function handleSendQuestion (event: FormEvent) {
    event.preventDefault();
    
    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    // create question
    await database.ref(`rooms/${id}/questions`).push(question);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={id!}/>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}