import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { auth, firebase } from './services/firebase';

type AuthContextType = { 
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type User = { 
  id: string;
  name: string;
  avatar: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function App() {
  const [user, setUser] = useState<User>();

  async function signInWithGoogle () {
    // choose provider
    const provider = new firebase.auth.GoogleAuthProvider();

    // Popup signIn
    const result = await  auth.signInWithPopup(provider)
    
    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error ('Missing information from Google Account.'); 
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
