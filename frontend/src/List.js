import {Dropdown, ListGroup} from "react-bootstrap";
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';
import React from "react";

export function GetNumeratedList(list) {
    for (const i in list) {
        list[i] = {value: list[i], index: i};
    }

    return list;
}

export function GetCheckableNumeratedList(list) {
    for (const i in list) {
        list[i] = {value: list[i], index: i, checked: false};
    }

    return ToggleListItem;

    function ToggleListItem(index = undefined) {
        if (index === undefined) return list;

        list[index].checked = !list[index].checked;
        return list;
    }
}

export function GetDraggableNumeratedList(list) {
    for (const i in list) {
        list[i] = {value: list[i], index: i};
    }

    return DragListItem;

    function DragListItem(from = undefined, to = undefined) {
        if (from === to) return list;

        const [dragged] = list.splice(from, 1);
        list.splice(to, 0, dragged);

        return list;
    }
}

export function NumeratedListGroup({list, className, itemClassName}) {
    return (<ListGroup className={className}>
        {list.map((item) => (<ListGroup.Item key={item.index} className={itemClassName}>
                {item.value}
            </ListGroup.Item>)
        )}
    </ListGroup>)
}

export function DraggableNumeratedListGroup({list, className, itemClassName}) {
    return (<DragDropContext onDragEnd={HandleOnDragEnd}>
        <Droppable droppableId={Math.random().toString() + "_" + Math.random().toString()}>
            {provided => (
                <ul className={className} {...provided.droppableProps} ref={provided.innerRef}>
                    {list().map((item, index) => (<Draggable key={item.index.toString()} draggableId={item.index.toString()} index={index}>
                        {provided => (
                            <li className={itemClassName} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                {item.value}
                            </li>)}
                    </Draggable>))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    </DragDropContext>)

    function HandleOnDragEnd(result) {
        if (!result.destination) return;

        let from = result.source.index;
        let to = result.destination.index;

        list(from, to);
    }
}

export function CheckableNumeratedListGroup({list, className, itemClassName, checkedItemClassName}) {
    return (<ListGroup className={className}>
        {list().map((item) => {
            if (item.checked) {
                return (<ListGroup.Item key={item.index} className={itemClassName + ' ' + checkedItemClassName}>
                    {item.value}
                </ListGroup.Item>)
            } else {
                return (<ListGroup.Item key={item.index} className={itemClassName}>
                    {item.value}
                </ListGroup.Item>)
            }
        })}
    </ListGroup>)
}