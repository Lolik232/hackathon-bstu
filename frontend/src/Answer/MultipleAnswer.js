import {CheckBoxIndexed} from "../List/CheckableIndexed";
import {makeCheckable, makeIndexed, makeRef} from "../List/List";

export function MultipleAnswer({list, onChanged}) {
    const checkableIndexedRef = makeRef(makeCheckable(makeIndexed(list)));

    const handleOnChanged = () => {
        onChanged(checkableIndexedRef.ref.filter(item => item.checked).map(item => item.index))
    }

    return <CheckBoxIndexed checkableIndexedRef={checkableIndexedRef} onChanged={handleOnChanged}/>
}