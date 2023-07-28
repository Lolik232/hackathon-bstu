import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function DragAndDropAnswerList({numeratedList}) {


    return (<DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
            {(provided) => (
                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {characters.map(({id, name, thumb}, index) => {
                        return (
                            <Draggable key={id} draggableId={id} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div className="characters-thumb">
                                            <img src={thumb} alt={`${name} Thumb`} />
                                        </div>
                                        <p>
                                            { name }
                                        </p>
                                    </li>
                                )}
                            </Draggable>
                        );
                    })}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    </DragDropContext>
    )
}