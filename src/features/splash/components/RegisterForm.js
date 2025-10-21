// src/features/splash/components/RegisterForm.js
import React from 'react';
import { MdEmail, MdLock, MdPerson, MdTypeSpecimen } from 'react-icons/md';
import './LoginForm.css'
import LoginService from '../services/LoginService';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// ✅ CORREÇÃO FINAL DOS CAMINHOS (ERROS 2, 3, 4 resolvidos): Acessando pasta irmã shared/
import { useAuth } from '../../shared/context/AuthContext';
import useAuthStore from '../../shared/store/auth-store';
import useUserStore from '../../shared/store/user-store';

// ✅ CORREÇÃO FINAL DOS CAMINHOS: Acessando pasta irmã cadastro/
import RegisterSchool from '../../cadastro/components/RegisterSchool'; 
import RegisterDriver from '../../cadastro/components/RegisterDriver';
import RegisterResponsible from '../../cadastro/components/RegisterResponsible';


const RegisterForm = ({ goToLogin, goToCompleteRegistration, goToRegisterSchool, goToRegisterDriver, goToRegisterResponsible }) => { 

  const navigate = useNavigate();
  const { setAuthData } = useAuthStore();
  const { setMe } = useUserStore();


  const [form, setForm] = React.useState({name: "", email: "", password: "", tipo: "Admin" })
  const [errorMessages, setErrorMessages] = React.useState({name: "", email: "", password: "", tipo: "" })


  const submitForm = async (e) => {
    e.preventDefault();

    console.log("Formulário de Registro Básico submetido:", form)
   goToCompleteRegistration(form);
  }

  // Função helper para lidar com a mudança nos campos
  const handleFormChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  // Array de campos de formulário (agora renderizado manualmente)
  const formFields = [
    { fieldName: "name", type: "text",  placeholder: "Insert your name", icon: <MdPerson className="text-gray-400 mr-2" size={20} /> },
    { fieldName: "email", type: "email",  placeholder: "Insert your email", icon: <MdEmail className="text-gray-400 mr-2" size={20} /> },
    { fieldName: "password", type: "password",  placeholder: "Insert your password", icon: <MdLock className="text-gray-400 mr-2" size={20} /> },
  ];
  
  // Renderiza um campo de formulário básico
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
                    value={form[fieldName]}
                    onChange={handleFormChange}
                    className="appearance-none border-none w-full bg-transparent text-gray-700 leading-tight focus:outline-none"
                />
            </div>
        </label>
        {errorMessages[fieldName] && <p className="text-red-500 text-xs italic">{errorMessages[fieldName]}</p>}
    </div>
  );


  return (
    <div className="flex slideIn items-center justify-center  bg-gray-100">
      <div className="bg-white  p-8 rounded-lg shadow-xl w-full max-w-sm animate-slideIn">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">ESTOQUE - FRONT (REGISTRO)</h1>


        <form>
            {/* Renderiza os campos de forma manual, substituindo FormComponent */}
            {formFields.map(renderField)}

          {/* Campo de Tipo */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus-within:ring-2 focus-within:ring-blue-500">
                <MdTypeSpecimen className="text-gray-400 mr-2" size={20} />
                <div className="flex flex-col items-start space-y-2">
                  <label htmlFor="user-role" className="text-gray-700 font-medium">
                    Select User Role:
                  </label>

                  {/* O elemento <select> */}
                  <select
                    id="user-role"
                    name="tipo"
                    value={form.tipo}
                    onChange={handleFormChange}
                    className="
          mt-1 block w-48 py-2 px-3 border border-gray-300 bg-white 
          rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
          focus:border-indigo-500 sm:text-sm appearance-none
        "
                  >
                    {/* As opções */}
                    <option value="Admin">Admin</option>
                    <option value="Standard">Standard</option>
                    <option value="Guest">Guest</option>
                  </select>

                  <p className="text-sm text-gray-600 mt-2">
                    Current Role: <span className="font-semibold text-indigo-600">{form.tipo}</span>
                  </p>
                </div>
              </div>
            </label>
          </div>


          {/* Botão de Registro (Padrão) */}
          <div className="flex items-center justify-center mb-4">
            <button onClick={submitForm}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
              type="button"
            >
              COMPLETE YOUR REGISTRATION
            </button>
          </div>
          
          {/* Opções de Cadastro Específico */}
          <div className="text-center mb-4 text-sm text-gray-600">
            --- OU CADASTRE COMO ---
          </div>
          <div className="flex flex-col space-y-2">
            <a onClick={goToRegisterSchool} className="w-full text-center bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200 cursor-pointer">
              CADASTRO ESCOLA
            </a>
            <a onClick={goToRegisterDriver} className="w-full text-center bg-green-400 hover:bg-green-500 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200 cursor-pointer">
              CADASTRO MOTORISTA
            </a>
            <a onClick={goToRegisterResponsible} className="w-full text-center bg-red-400 hover:bg-red-500 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200 cursor-pointer">
              CADASTRO RESPONSÁVEL
            </a>
          </div>

          {/* Link para Login */}
          <div className="flex items-center justify-center mt-4">
            <a onClick={goToLogin}
              className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200 cursor-pointer"
              href="#"
            >
              IR PARA LOGIN
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;