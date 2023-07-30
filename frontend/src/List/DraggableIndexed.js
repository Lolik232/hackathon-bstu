import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import {ListGroup} from "react-bootstrap";
import {dragIndexedItem} from "./List";
import React from "react";

export const DraggableIndexed = ({indexedRef}) => {
    const handleOnDragEnd = (event) => {
        if (!event.destination) return;

        let from = event.source.index;
        let to = event.destination.index;

        dragIndexedItem(indexedRef, from, to);
    }

    return (<DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={Math.random().toString()}>
            {provided => (<ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                {indexedRef.ref.map((item, index) => (
                    <Draggable key={item.index.toString()} draggableId={item.index.toString()} index={index}>
                        {provided => (<ListGroup.Item {...provided.draggableProps}
                                                      ref={provided.innerRef} {...provided.dragHandleProps}>
                            {item.value}
                        </ListGroup.Item>)}
                    </Draggable>))}
                {provided.placeholder}
            </ListGroup>)}
        </Droppable>
    </DragDropContext>)
}