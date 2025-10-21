// src/features/splash/components/RegisterComplete.js
import React from 'react';
import { MdHome, MdPerson, MdPhone, MdLocationOn } from 'react-icons/md';
import './LoginForm.css'
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// ✅ CORREÇÃO FINAL DOS CAMINHOS: Acessando pasta irmã shared/
import { useAuth } from '../../shared/context/AuthContext';
import useAuthStore from '../../shared/store/auth-store';
import useUserStore from '../../shared/store/user-store';


const RegisterComplete = ({ goBackToRegister, form, setForm }) => {

  const navigate = useNavigate();
  const { setAuthData } = useAuthStore();
  const { setMe } = useUserStore();

  const [errorMessages, setErrorMessages] = React.useState({})


  const submitForm = async (e) => {
    e.preventDefault();

    try {
        const fullRegistrationData = form; 
        console.log("Tentando registrar usuário completo:", fullRegistrationData);
        
        const responseData = await LoginService.register(fullRegistrationData);
        const receivedTokenFromBackend = responseData.token;

        const decodedUser = {
          uid: 'new-user-456',
          email: fullRegistrationData.email,
          role: fullRegistrationData.tipo
        }

        localStorage.setItem("accessToken", receivedTokenFromBackend)
        setAuthData(receivedTokenFromBackend, decodedUser);
        setMe(decodedUser);

        navigate('/home'); 

    } catch (error) {
        console.error("Erro no registro completo:", error);
        setErrorMessages({ general: "Falha ao registrar. Tente novamente." });
    }
  }

  // Função helper para lidar com a mudança nos campos
  const handleFormChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  // Renderiza um campo de formulário básico (substituindo o FormComponent)
  const renderField = ({ fieldName, type, placeholder, icon }) => (
    <div className="mb-4" key={fieldName}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={fieldName}>
            <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus-within:ring-2 focus-within:ring-blue-500">
                {icon}
                <input
                    id={fieldName}
                    type={type}
                    name={fieldName}
                    placeholder={placeholder}
                    value={form[fieldName] || ''} 
                    onChange={handleFormChange}
                    className="appearance-none border-none w-full bg-transparent text-gray-700 leading-tight focus:outline-none"
                />
            </div>
        </label>
        {errorMessages[fieldName] && <p className="text-red-500 text-xs italic">{errorMessages[fieldName]}</p>}
    </div>
  );


  // Definição de campos adicionais por Tipo
  const adminFormFields = [
    { fieldName: "cpf", type: "text", placeholder: "CPF", icon: <MdPerson className="text-gray-400 mr-2" size={20} /> },
    { fieldName: "address", type: "text", placeholder: "Endereço da Sede", icon: <MdLocationOn className="text-gray-400 mr-2" size={20} /> },
  ]
  const standardFormFields = [
    { fieldName: "phone", type: "tel", placeholder: "Telefone", icon: <MdPhone className="text-gray-400 mr-2" size={20} /> },
  ]
  const guestFormFields = [
    { fieldName: "nickname", type: "text", placeholder: "Apelido", icon: <MdPerson className="text-gray-400 mr-2" size={20} /> },
  ]


  return (
    <div className="flex slideIn items-center justify-center  bg-gray-100">
      <div className="bg-white  p-8 rounded-lg shadow-xl w-full max-w-sm animate-slideIn">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">COMPLETAR REGISTRO ({form.tipo})</h1>
        <p className="text-sm text-center mb-4 text-gray-600">
            Adicione detalhes adicionais para o seu tipo de conta.
        </p>


        <form>

          {/* Renderiza campos específicos diretamente */}
          {form.tipo === "Admin" && adminFormFields.map(renderField)}
          {form.tipo === "Standard" && standardFormFields.map(renderField)}
          {form.tipo === "Guest" && guestFormFields.map(renderField)}


          {/* Botão de Registro */}
          <div className="flex items-center justify-center mb-4">
            <button onClick={submitForm}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
              type="button"
            >
              FINALIZAR REGISTRO
            </button>
          </div>

          {/* Link para Voltar */}
          <div className="flex items-center justify-center">
            <a onClick={goBackToRegister}
              className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200 cursor-pointer"
              href="#"
            >
              VOLTAR
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComplete;