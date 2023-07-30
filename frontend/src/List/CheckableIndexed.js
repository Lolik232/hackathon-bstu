import {ListGroup} from "react-bootstrap";
import "./CheckableIndexed.css"
import React from "react";
import {chooseCheckableItem, toggleCheckableItem} from "./List";

const CheckableIndexed = ({checkableIndexedRef, chooseItem}) => {
    const [forceUpdater, setForceUpdater] = React.useState({});

    const handleOnClick = (index) => {
        chooseItem(checkableIndexedRef, index);
        setForceUpdater({})
    }


    return (<ListGroup>
        {checkableIndexedRef.ref.map((item, index) => {
            console.log(item, index);
            return <ListGroup.Item key={item.index}
                                   variant={item.checked ? "primary" : "light"}
                                   onClick={() => (handleOnClick(index))}>
                {item.value}
            </ListGroup.Item>
        })}
    </ListGroup>)
}

export const CheckBoxIndexed = ({checkableIndexedRef}) => {
    return <CheckableIndexed checkableIndexedRef={checkableIndexedRef}
                             chooseItem={toggleCheckableItem}/>
}

export const RadioIndexed = ({checkableIndexedRef}) => {
    return <CheckableIndexed checkableIndexedRef={checkableIndexedRef}
                             chooseItem={chooseCheckableItem}/>
}