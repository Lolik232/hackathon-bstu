import {GetCheckableNumeratedList} from "../List/List";
import {CheckableNumeratedListGroup} from "../List/CheckableNumeratedListGroup";

export function MultipleAnswer({list = []}) {
    return <CheckableNumeratedListGroup list={GetCheckableNumeratedList(Array.from(list))}/>
}