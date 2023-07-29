import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import {ListGroup} from "react-bootstrap";
import React from "react";

export function DraggableNumeratedListGroup({list}) {
    return (<DragDropContext onDragEnd={HandleOnDragEnd}>
        <Droppable droppableId={Math.random().toString()}>
            {provided => (
                <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                    {list().map((item, index) => (<Draggable key={item.index.toString()} draggableId={item.index.toString()} index={index}>
                        {provided => (
                            <ListGroup.Item {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                {item.value}
                            </ListGroup.Item>)}
                    </Draggable>))}
                    {provided.placeholder}
                </ListGroup>
            )}
        </Droppable>
    </DragDropContext>)

    function HandleOnDragEnd(e) {
        if (!e.destination) return;

        let from = e.source.index;
        let to = e.destination.index;

        list(from, to);
    }
}