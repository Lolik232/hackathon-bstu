import {ListGroup} from "react-bootstrap";
import React from "react";
import {chooseCheckableItem, makeRef, toggleCheckableItem} from "./List";

const CheckableIndexed = ({checkableIndexedRef, onChanged, chooseItem}) => {
    const [forceUpdater, setForceUpdater] = React.useState({});

    const handleOnChanged = () => {
        onChanged();
    }

    const handleOnClick = (item) => {
        chooseItem(checkableIndexedRef, item.index);
        setForceUpdater({})
        handleOnChanged();
    }

    handleOnChanged();
    return (<ListGroup>
        {checkableIndexedRef.ref.map((item) => (<ListGroup.Item key={item.index}
                                                                active={!!item.checked}
                                                                onClick={() => (handleOnClick(item))}>
            {item.value}
        </ListGroup.Item>))}
    </ListGroup>)
}

export const CheckBoxIndexed = ({checkableIndexedRef, onChanged}) => {
    return <CheckableIndexed checkableIndexedRef={checkableIndexedRef}
                             onChanged={onChanged}
                             chooseItem={toggleCheckableItem}/>
}

export const RadioIndexed = ({checkableIndexedRef, onChanged}) => {
    return <CheckableIndexed checkableIndexedRef={checkableIndexedRef}
                             onChanged={onChanged}
                             chooseItem={chooseCheckableItem}/>
}