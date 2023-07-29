import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import {Indexed} from "../List/Indexed";
import {DraggableIndexed} from "../List/DraggableIndexed";
import {makeCheckable, makeIndexed, makeRef} from "../List/List";

export function MatchAnswer({staticIndexed, draggableIndexed, onChanged}) {
    const staticIndexedRef = makeRef(staticIndexed);
    const draggableIndexedRef = makeRef(draggableIndexed);

    const handleOnChanged = () => {
        onChanged({
            static: staticIndexedRef.ref.map(item => item.index),
            draggable: draggableIndexedRef.ref.map(item => item.index)
        })
    }

    return (<Row>
        <Col>
            <Indexed indexedRef={staticIndexedRef}/>
        </Col>
        <Col>
            <DraggableIndexed indexedRef={draggableIndexedRef} onChanged={handleOnChanged}/>
        </Col>
    </Row>)
}

