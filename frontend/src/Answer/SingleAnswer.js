import {RadioIndexed} from "../List/CheckableIndexed";
import {makeCheckable, makeIndexed, makeRef} from "../List/List";

export function SingleAnswer({list, onChanged}) {
    const checkableIndexedRef = makeRef(makeIndexed(makeCheckable(list)));

    const handleOnChanged = () => {
        onChanged(checkableIndexedRef.ref.filter(item => item.checked).map(item => item.index))
    }

    return <RadioIndexed checkableIndexedRef={checkableIndexedRef} onChanged={handleOnChanged}/>
}