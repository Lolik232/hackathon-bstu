import React from "react";
import {ListGroup} from "react-bootstrap";

export function NumeratedListGroup({list}) {
    return (<ListGroup>
        {list.map((item) => (<NumeratedListItem key={item.index} item={item}/>))}
    </ListGroup>)

    function NumeratedListItem({item, className}) {
        return (<ListGroup.Item className={className}>
            {item.value}
        </ListGroup.Item>)
    }
}
