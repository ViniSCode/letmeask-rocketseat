import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

export function useRoom (roomId: string) {
  const [questions, setQuestion] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  useEffect( ()=> { 
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      // transforma obj em array
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return { 
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      });
      setTitle(databaseRoom.title);
      setQuestion(parsedQuestions);
    })

  }, [roomId]);

  return { questions, title}
}