import './Select.module.scss';

const Select = ({ handleSelect }) => {
    return (
        <select onChange={e => handleSelect(e)}>
            <option value="artist">artist</option>
            <option value="album">album</option>
            <option value="track">track</option>
            <option value="playlist">playlist</option>
        </select>
    );
}

export default Select;