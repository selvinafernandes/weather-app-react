import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, label, id, text, type, value, handleChange }) => (
	<div className='form-element'>
		<label htmlFor={label}>{text}</label>
		<input
			name={name}
			type={type}
			text={text}
			value={value}
			id={id}
			className='form-control'
			onChange={handleChange}
			required
		/>
	</div>
);

Input.propTypes = {
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};

export default Input;
