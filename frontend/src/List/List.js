const listCopy = (value) => {
    return [...value]
}

const makeObjectList = (list) => {
    let objectList = listCopy(list);
    for (const i in objectList)
        if (typeof objectList[i] === 'object' && objectList[i] !== null)
            objectList[i] = {...objectList[i]}
        else
            objectList[i] = {value: objectList[i]}
    return objectList;

}

export const makeRef = (value) => {
    return {ref: value}
}

export const makeIndexed = (list) => {
    let indexed = listCopy(list);
    let indexes = [];
    for (const i in indexed)
        indexes[i] = i;

    shuffle(indexes);
    for (const i in indexed)
        indexed[i] = {value: indexed[i], index: indexes[i]};

    return indexed;
}

const  shuffle = (array) =>  {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const makeCheckable = (list) => {
    let checkable = makeObjectList(list);
    for (const i in checkable)
        checkable[i] = {...checkable[i], checked: Boolean(false)}

    return checkable;
}

export function toggleCheckableItem(checkableRef, i) {
    checkableRef.ref[i].checked = !checkableRef.ref[i].checked
}

export function chooseCheckableItem(checkableRef, i) {
    for (const i in checkableRef.ref)
        checkableRef.ref[i].checked = false;


    checkableRef.ref[i].checked = true;
}

export function dragIndexedItem(indexedRef, from, to) {
    if (from === to) return;

    const [dragged] = indexedRef.ref.splice(from, 1);
    indexedRef.ref.splice(to, 0, dragged);
}