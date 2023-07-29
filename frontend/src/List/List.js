export function GetNumeratedList(list) {
    for (const i in list) {
        list[i] = {value: list[i], index: i};
    }

    return list;
}

export function GetCheckableNumeratedList(list) {
    for (const i in list) {
        list[i] = {value: list[i], index: i, checked: false};
    }

    return ToggleListItem;

    function ToggleListItem(index = undefined) {
        if (index === undefined) return list;

        list[index].checked = !list[index].checked;
        return ToggleListItem;
    }
}

export function GetRadioNumeratedList(list) {
    for (const i in list) {
        list[i] = {value: list[i], index: i, checked: false};
    }

    return ChooseListItem;

    function ChooseListItem(index = undefined) {
        if (index === undefined) return list;

        for (let item of list) {
            item.checked = false;
        }

        list[index].checked = true;
        return ChooseListItem;
    }
}

export function GetDraggableNumeratedList(list) {
    for (const i in list) {
        list[i] = {value: list[i], index: i};
    }

    return DragListItem;

    function DragListItem(from = undefined, to = undefined) {
        if (from === to) return list;

        const [dragged] = list.splice(from, 1);
        list.splice(to, 0, dragged);

        return DragListItem;
    }
}