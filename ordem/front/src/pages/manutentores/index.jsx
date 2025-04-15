import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

export default function manutentores() {
  const [manutentores, setmanutentores] = useState([]);
  const [formData, setFormData] = useState({ ni: '', nome: '', area: '', gestor: ''});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/manutentores')
      .then(res => res.json())
      .then(data => setmanutentores(data))
      .catch(err => console.error('Erro ao buscar manutentores:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `http://127.0.0.1:8000/api/manutentores/id/${editId}`
      : 'http://127.0.0.1:8000/api/manutentores';
    const method = editId ? 'PUT' : 'POST';

    try {
      const areaonse = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (areaonse.ok) {
        const updatedItem = await areaonse.json();
        setmanutentores(prev =>
          editId
            ? prev.map(item => (item.id === editId ? updatedItem : item))
            : [...prev, updatedItem]
        );
        setFormData({ ni: '', nome: '', area: '' });
        setEditId(null);
      }
    } catch (err) {
      console.error('Erro ao enviar manutentor:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const areaonse = await fetch(`http://127.0.0.1:8000/api/manutentores/id/${id}`, {
        method: 'DELETE',
      });

      if (areaonse.ok) {
        setmanutentores(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Erro ao deletar manutentor:', err);
    }
  };

  const handleEdit = (amb) => {
    setFormData({ ni: amb.ni, nome: amb.nome, area: amb.area });
    setEditId(amb.id);
  };

  return (
    <main className="main-home">
      <div className="home-container">
        <h1 className="home-title">Gerenciar manutentores</h1>

        <ul className="ambiente-list">
          {manutentores.map((amb) => (
            <li key={amb.id}>
              <strong>NI:</strong> {amb.ni} <br />
              <strong>nome:</strong> {amb.nome} <br />
              <strong>area:</strong> {amb.area}
              <strong>gestor:</strong> {amb.gestor} <br />
              <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                <button onClick={() => handleEdit(amb)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(amb.id)} className="btn-delete">Deletar</button>
              </div>
            </li>
          ))}
        </ul>

        <form className="ambiente-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="ni"
            placeholder="NI"
            value={formData.ni}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nome"
            placeholder="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="area"
            placeholder="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="gestor"
            placeholder="gestor"
            value={formData.gestor}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-home">
            {editId ? 'Atualizar' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
