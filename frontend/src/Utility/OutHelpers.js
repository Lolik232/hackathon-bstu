export function makeOutCheckableAnswerListIndexed(answerList) {
    let indexed = [];
    for (let i in answerList)
        indexed [i] = {
            value: answerList[i].value,
            checked: answerList[i].checked,
            index: i
        };

    return indexed;
}

export function makeOutAnswerListCheckable(answerList) {
    let checkable = [];
    for (let i in answerList)
        checkable[i] = {
            value: answerList[i],
            checkable: false
        };

    return checkable;
}

export function outRef(outValue) {
    return {ref: outValue};
}