import React from "react";
import {ListGroup} from "react-bootstrap";

export function MyList({indexedRef}) {
    return (<ListGroup>
        {indexedRef.ref.map((item, index) => (<ListGroup.Item key={index}>{item.value}</ListGroup.Item>))}
    </ListGroup>)
}