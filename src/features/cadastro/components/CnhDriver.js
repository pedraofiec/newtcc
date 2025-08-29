import React from 'react';
import { useState } from 'react';

// O código da página CNH que foi gerado anteriormente
const App = () => {
  // State for the CNH number input
  const [cnhNumber, setCnhNumber] = useState('');
  // State for the uploaded image file
  const [cnhImage, setCnhImage] = useState(null);
  // State for the image preview URL
  const [imagePreview, setImagePreview] = useState(null);
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Handles file selection and sets the state and preview URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCnhImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (cnhNumber && cnhImage) {
      // In a real app, you would send this data to a backend
      console.log('Dados submetidos:', { cnhNumber, cnhImage });
      setShowModal(true);
    } else {
      console.log('Por favor, preencha todos os campos.');
      // Using an alternative to alert() for better UI
      // In a real application, you would use a dedicated modal or toast message
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F0F4F8] font-sans">
      {/* Main content container, centered and with top padding */}
      <div className="flex flex-col items-center w-full max-w-sm mt-12 px-4 space-y-8 pt-24">
        {/* Profile/User Icon section */}
        <div className="w-24 h-24 bg-[#E0E0E0] rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-16 h-16 text-[#666]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        {/* CNH Input field */}
        <div className="w-full">
          <input
            type="text"
            placeholder="CNH"
            value={cnhNumber}
            onChange={(e) => setCnhNumber(e.target.value)}
            className="w-full p-3 text-center bg-[#E0E0E0] rounded-xl outline-none focus:ring-2 focus:ring-[#4DD0E1] transition-all"
          />
        </div>

        {/* Image upload area */}
        <div
          className={`w-full h-64 bg-[#E0E0E0] rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-300 ${
            imagePreview ? 'bg-cover bg-center' : ''
          }`}
          style={{ backgroundImage: imagePreview ? `url('${imagePreview}')` : 'none' }}
          onClick={() => document.getElementById('cnh-image-input').click()}
        >
          {/* Hidden file input */}
          <input
            id="cnh-image-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {/* Upload icon and text visible only without a preview */}
          {!imagePreview && (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#666] mb-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-3.72 0-6.84 2.76-7.51 6.35-2.02.7-3.49 2.65-3.49 4.9 0 3.03 2.47 5.5 5.5 5.5h11c3.03 0 5.5-2.47 5.5-5.5 0-2.25-1.47-4.2-3.49-4.9zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
              </svg>
              <span className="text-gray-600">Anexar CNH</span>
            </>
          )}
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#4DD0E1] text-[#004D40] font-bold text-xl rounded-full shadow-lg hover:bg-[#34A4B5] transition-all duration-300"
        >
          Próximo
        </button>
      </div>

      {/* Modal section */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h3 className="text-xl font-bold mb-4">Dados Enviados</h3>
            <p>Seus dados foram submetidos com sucesso!</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-[#4DD0E1] text-white rounded-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;