import {DraggableIndexed} from "../List/DraggableIndexed";
import {makeIndexed, makeRef} from "../List/List";

export function SequenceAnswer({list, onChanged}) {
    const indexedRef = makeRef(makeIndexed(list));

    const handleOnChanged = () => {
        onChanged(indexedRef.ref.map(item => item.index))
    }

    return <DraggableIndexed indexedRef={indexedRef} onChanged={handleOnChanged}/>
}