"use client";

import { useEffect, useState } from 'react';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState('');
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/admins');
      if (!response.ok) throw new Error('Failed to fetch admins');
      const data = await response.json();
      setAdmins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const adminData = { email };

    try {
      if (editingAdmin) {
        // Update existing admin
        const response = await fetch(`/api/admin/admins/${editingAdmin.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(adminData),
        });
        if (!response.ok) throw new Error('Failed to update admin');
      } else {
        // Add new admin (existing user by email)
        const response = await fetch('/api/admin/admins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(adminData),
        });
        if (!response.ok) throw new Error('Failed to add admin. Ensure the user exists.');
      }
      fetchAdmins();
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setEditingAdmin(null);
  };

  const handleEdit = (admin) => {
    setEmail(admin.email);
    setEditingAdmin(admin);
  };

  const handleDelete = async (id) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/admins/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete admin');
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Manage Admins</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}
      
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="User Email"
          required
          className="p-2 mr-2 border"
        />
        <button type="submit" className="p-2 text-white bg-blue-500">
          {editingAdmin ? 'Update Admin' : 'Add Admin'}
        </button>
        {editingAdmin && (
          <button type="button" onClick={resetForm} className="p-2 ml-2 text-white bg-gray-400">
            Cancel
          </button>
        )}
      </form>

      <ul>
        {admins.map((admin) => (
          <li key={admin.id} className="flex items-center justify-between mb-2">
            <span>{admin.email}</span>
            <div>
              <button onClick={() => handleEdit(admin)} className="p-1 mr-2 text-white bg-yellow-500">
                Edit
              </button>
              <button onClick={() => handleDelete(admin.id)} className="p-1 text-white bg-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAdmins;
