import React, { useState } from 'react';

const EditableText = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
    setText(document.querySelector('h1').textContent);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const saveChanges = () => {
    document.querySelector('h1').textContent = text;
    closeModal();
  }

  return (
    <div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Editor de Texto</h2>
            <textarea
              rows="4"
              cols="50"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea><br />
            <button onClick={saveChanges}>Salvar Alterações</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditableText;