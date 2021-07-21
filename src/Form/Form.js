import Input from '../Input/Input';
import Select from '../Select/Select';

import './Form.module.scss';

const Form = ({ handleChange, handleClick }) => {
    return (
        <form onSubmit={handleClick}>
            <Input type="text" handleChange={handleChange} />
            <div>
                <Select />
                <Input type="submit" value="Search" />
            </div>
        </form>);
}

export default Form;