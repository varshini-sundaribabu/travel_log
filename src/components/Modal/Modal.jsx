import React from 'react';
import Button from '../Button/Button';
import './Modal.scss';

const Modal = ({ title, fields, handleSubmit, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="form-group">
              <label>{field.label}</label>
              {field.type === 'select' ? (
                <select {...field.props} required>
                  <option value="" disabled>{field.placeholder}</option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <input type={field.type} {...field.props} required />
              )}
            </div>
          ))}
          <Button text="Submit" type="submit"/>
          <Button text="Close" className="close-button" onClickHandler={closeModal}/>
        </form>
      </div>
    </div>
  );
};

export default Modal;
