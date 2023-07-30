export function makeInAnswerListCheckable(answerList) {
    let checkable = [];
    for (const i in answerList)
        checkable[i] = {
            value: answerList[i].value,
            index: answerList[i].index,
            checkable: false
        };

    return checkable;
}

export function makeInAnswerList(answerList, indexList) {
    let concatenated = [];
    for (const i in indexList)
        concatenated = {
            value: answerList[i],
            index: indexList[i]
        };

    return concatenated;
}

export function inRef(inValue) {
    return {ref: inValue};
}