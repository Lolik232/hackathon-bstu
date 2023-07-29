import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";

import {DraggableNumeratedListGroup, NumeratedListGroup} from "../List/NumeratedListGroup";

export class MatchAnswer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            staticList: props.staticList,
            draggableList: props.draggableList,
        }
    }

    render() {
        return (<Row>
            <Col>
                <NumeratedListGroup list={this.state.staticList}/>
            </Col>
            <Col>
                <DraggableNumeratedListGroup list={this.state.draggableList}/>
            </Col>
        </Row>)
    }
}