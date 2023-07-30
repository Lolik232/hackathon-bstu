import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import {Indexed} from "../List/Indexed";
import {DraggableIndexed} from "../List/DraggableIndexed";

export function MatchAnswer({staticRef, draggableRef}) {
    return (<Row>
        <Col>
            <Indexed indexedRef={staticRef}/>
        </Col>
        <Col>
            <DraggableIndexed indexedRef={draggableRef}/>
        </Col>
    </Row>)
}

