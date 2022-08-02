import '../css/ListItem.css';

const ListItem = (props) => {
    return (
        <div className={props.order === 0 ? "list-item first" : "list-item"}>
            <h3>{props.name} <span>({props.equipment})</span></h3>
            <div className="target-muscles">
                <div className="primary">{props.primary}</div>
                {props.secondary != null &&
                    <div className="secondary">{props.secondary}</div>
                }
                {props.tertiary != null &&
                    <div className="tertiary">{props.tertiary}</div>
                }
            </div>
        </div>
    )
};

export default ListItem;