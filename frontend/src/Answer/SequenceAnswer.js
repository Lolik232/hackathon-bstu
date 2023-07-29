import {DraggableNumeratedListGroup} from "../List/DraggableNumeratedListGroup";
import {GetDraggableNumeratedList} from "../List/List";

export function SequenceAnswer({list = []}) {
    return <DraggableNumeratedListGroup list={GetDraggableNumeratedList(Array.from(list))}/>
}