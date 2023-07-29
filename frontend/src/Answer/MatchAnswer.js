import {GetDraggableNumeratedList, GetNumeratedList} from "../List/List";
import {DraggableNumeratedListGroup} from "../List/DraggableNumeratedListGroup";
import {NumeratedListGroup} from "../List/NumeratedListGroup";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function MatchAnswer({staticList = [], draggableList = []}) {
    return (<Row>
        <Col>
            <NumeratedListGroup list={GetNumeratedList(Array.from(staticList))}/>
        </Col>
        <Col>
            <DraggableNumeratedListGroup list={GetDraggableNumeratedList(Array.from(draggableList))}/>
        </Col>
    </Row>)

}