import React from "react";
import {ListGroup} from "react-bootstrap";
import {DraggableNumeratedList, NumeratedList} from "./NumeratedList";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";

export class NumeratedListGroup extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            list: new NumeratedList(props.list)
        }
    }

    render() {
        return (<ListGroup>
            {this.state.list.data.map((item) => (<ListGroup.Item key={item.index}>{item.value}</ListGroup.Item>))}
        </ListGroup>)
    }
}

export class DraggableNumeratedListGroup extends NumeratedListGroup {

    constructor(props, context) {
        super(props, context);
        this.state = {
            list: new DraggableNumeratedList(props.list)
        }
    }

    render() {
        return (<DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={Math.random().toString()}>
                {provided => (
                    <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                        {this.state.list.data.map((item, index) => (
                            <Draggable key={item.index.toString()} draggableId={item.index.toString()} index={index}>
                                {provided => (
                                    <ListGroup.Item {...provided.draggableProps}
                                                    ref={provided.innerRef} {...provided.dragHandleProps}>
                                        {item.value}
                                    </ListGroup.Item>)}
                            </Draggable>))}
                        {provided.placeholder}
                    </ListGroup>
                )}
            </Droppable>
        </DragDropContext>)
    }

    handleOnDragEnd(e) {
        if (!e.destination) return;

        let from = e.source.index;
        let to = e.destination.index;

        this.state.list.dragListItem(from, to);
    }
}