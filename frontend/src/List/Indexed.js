import React from "react";
import {ListGroup} from "react-bootstrap";

export function Indexed({indexedRef}) {
    return (<ListGroup>
        {indexedRef.ref.map((item) => (<ListGroup.Item key={item.index}>{item.value}</ListGroup.Item>))}
    </ListGroup>)
}