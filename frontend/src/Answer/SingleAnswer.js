import {GetRadioNumeratedList} from "../List/List";
import {CheckableNumeratedListGroup} from "../List/CheckableNumeratedListGroup";

export function SingleAnswer({list = []}) {
    return <CheckableNumeratedListGroup list={GetRadioNumeratedList(Array.from(list))}/>
}