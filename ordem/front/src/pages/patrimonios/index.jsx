import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

export default function Patrimonios() {
  const [patrimonios, setpatrimonios] = useState([]);
  const [formData, setFormData] = useState({ ni: '', desc: '', loca: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/patrimonios')
      .then(res => res.json())
      .then(data => setpatrimonios(data))
      .catch(err => console.error('Erro ao buscar patrimonios:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `http://127.0.0.1:8000/api/patrimonios/id/${editId}`
      : 'http://127.0.0.1:8000/api/patrimonios';
    const method = editId ? 'PUT' : 'POST';

    try {
      const locaonse = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (locaonse.ok) {
        const updatedItem = await locaonse.json();
        setpatrimonios(prev =>
          editId
            ? prev.map(item => (item.id === editId ? updatedItem : item))
            : [...prev, updatedItem]
        );
        setFormData({ ni: '', desc: '', loca: '' });
        setEditId(null);
      }
    } catch (err) {
      console.error('Erro ao enviar patrimonio:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const locaonse = await fetch(`http://127.0.0.1:8000/api/patrimonios/id/${id}`, {
        method: 'DELETE',
      });

      if (locaonse.ok) {
        setpatrimonios(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Erro ao deletar patrimonio:', err);
    }
  };

  const handleEdit = (amb) => {
    setFormData({ ni: amb.ni, desc: amb.desc, loca: amb.loca });
    setEditId(amb.id);
  };

  return (
    <main className="main-home">
      <div className="home-container">
        <h1 className="home-title">Gerenciar Patrimonios</h1>

        <ul className="ambiente-list">
          {patrimonios.map((amb) => (
            <li key={amb.id}>
              <strong>NI:</strong> {amb.ni} <br />
              <strong>Desc:</strong> {amb.desc} <br />
              <strong>Loca:</strong> {amb.loca}
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
            name="desc"
            placeholder="Desc"
            value={formData.desc}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="loca"
            placeholder="Loca"
            value={formData.loca}
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
