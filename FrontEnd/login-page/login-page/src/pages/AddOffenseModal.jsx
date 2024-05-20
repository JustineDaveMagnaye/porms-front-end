import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/AddEditModal.css';

const AddOffenseModal = ({ isOpen, onClose, onSubmit }) => {
    const [newOffense, setNewOffense] = useState({
        description: "",
        type: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOffense({ ...newOffense, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newOffense);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
            <button onClick={onClose} className="close-btn">&times;</button>
            <h2>Add Offense</h2>
            <form onSubmit={handleSubmit} className='form-container'>
                <div className="form-group">
                    <label>Offense</label>
                    <input type="text" name="description" value={newOffense.description} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select name="type" value={newOffense.type} onChange={handleInputChange} required>
                        <option value="" disabled>Select type</option>
                        <option value="Major">Major</option>
                        <option value="Minor">Minor</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </Modal>
    );
};

export default AddOffenseModal;