import Card from '../Card/Card';

const List = ({ data, type }) => {
    return (<ul>
        {data.map((item, index) => {
            if (index < 5) {
                return <Card data={item} type={type} key={item.id} />
            }
        })}
    </ul>);
}

export default List;