import {ListGroup} from "react-bootstrap";
import "./Checkable.css"
import React from "react";
import {chooseCheckableItem, toggleCheckableItem} from "./List";

const MyCheckable = ({checkableIndexedRef, chooseItem}) => {
    const [forceUpdater, setForceUpdater] = React.useState({});

    const handleOnClick = (index) => {
        chooseItem(checkableIndexedRef, index);
        setForceUpdater({})
    }


    return (<ListGroup>
        {checkableIndexedRef.ref.map((item, index) => {
            return <ListGroup.Item key={index}
                                   variant={item.checked ? "primary" : "light"}
                                   onClick={() => (handleOnClick(index))}>
                {item.value}
            </ListGroup.Item>
        })}
    </ListGroup>)
}

export const CheckBoxIndexed = ({checkableIndexedRef}) => {
    return <MyCheckable checkableIndexedRef={checkableIndexedRef}
                        chooseItem={toggleCheckableItem}/>
}

export const RadioIndexed = ({checkableIndexedRef}) => {
    return <MyCheckable checkableIndexedRef={checkableIndexedRef}
                        chooseItem={chooseCheckableItem}/>
}