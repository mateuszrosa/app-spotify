import './Input.module.scss';

const Input = ({ type, value, handleChange }) => {
    return (<input type={type} value={value} onChange={e => handleChange(e)} />);
}

export default Input;