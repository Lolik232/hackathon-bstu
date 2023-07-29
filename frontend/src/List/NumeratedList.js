export class NumeratedList {
    constructor(list = []) {
        this.data = [];
        for (const index in list) {
            this.data[index] = {value: list[index], index: index}
        }
    }
}

export class CheckableNumeratedList extends NumeratedList {
    constructor(list = []) {
        super();
        for (const index in list) {
            this.data[index] = {value: list[index], checked: false, index: index};
        }
    }

    toggleItem(index) {
        this.data[index].checked = !this.data[index].checked;
    }
}

export class RadioNumeratedList extends NumeratedList {
    constructor(list = []) {
        super();
        for (const index in list) {
            this.data[index] = {value: list[index], checked: false, index: index};
        }
    }

    chooseItem(index) {
        for (let item of this.data) {
            item.checked = false;
        }

        this.data[index].checked = true;
    }
}

export class DraggableNumeratedList extends NumeratedList {
    constructor(list = []) {
        super(list)
    }


    dragListItem(from, to) {
        if (from === to) return;

        const [dragged] = this.data.splice(from, 1);
        this.data.splice(to, 0, dragged);
    }
}