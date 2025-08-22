import React from 'react';
import LoginForm from './features/splash/components/LoginForm';
import './features/splash/components/LoginForm.css'; // Importa o CSS de animação
import 'tailwindcss/tailwind.css'; // Importa o Tailwind CSS
import './index.css'; // Tailwind CSS

function App() {
  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
