import Input from '../../atoms/Input/Input';
import Select from '../../atoms/Select/Select';

import './Form.module.scss';

const Form = ({ handleChange, handleClick, handleSelect }) => {
    return (
        <form onSubmit={handleClick}>
            <Input type="text" handleChange={handleChange} />
            <div>
                <Select handleSelect={handleSelect} />
                <Input type="submit" value="Search" />
            </div>
        </form>);
}

export default Form;