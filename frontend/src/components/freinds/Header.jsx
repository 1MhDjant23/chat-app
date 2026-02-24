import '../public/css/freindPage.css';

export const Header = ({ navBarList, setActiveItem }) => {
    return (
        <div className="freinds-header">
            <ul>
                {
                    navBarList.map(
                        (item, index) => <li
                                            key={index}
                                            onClick={e => {
                                                e.preventDefault();
                                                console.log("item clicked:", item);
                                                setActiveItem(item);
                                            }}
                                            >{item}
                                        </li>)
                }
            </ul>
        </div>
    );
}