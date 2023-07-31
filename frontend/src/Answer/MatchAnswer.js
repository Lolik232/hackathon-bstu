import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import {MyList} from "../List/MyList";
import {MyDraggable} from "../List/MyDraggable";

export function MatchAnswer({staticRef, draggableRef}) {
    return (<Row>
        <Col>
            <MyList indexedRef={staticRef}/>
        </Col>
        <Col>
            <MyDraggable indexedRef={draggableRef}/>
        </Col>
    </Row>)
}

