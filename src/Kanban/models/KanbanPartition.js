import KanbanData from "./KanbanData";

class KanbanPartition {
    constructor(name, data = []) {
        this.name = name
        this.key = name.toLocaleLowerCase()
        this.data = data
    }

    getName() {
        return this.name
    }

    setName(value) {
        this.name = value
    }

    getKey() {
        return this.key
    }

    setKey() {
        throw new Error("Partition Key cannot set manually")
    }

    getData() {
        return this.data
    }

    setData(initialData) {
        this.data = initialData
    }

    /**
     * Append data to this partition
     * @param {KanbanData} newData - Data must be KanbanData model
     */
    appendData(newData) {
        if(!(newData instanceof KanbanData)) throw new Error(`Data must be KanbanData model`)
        this.data = [...this.data, newData]
    }

    removeData(uuid) {
        this.data = this.data.filter(item => item.getId() !== uuid)
    }

    createNewData(name, description) {
        let newData = new KanbanData(name, description)
        this.data = [
            ...this.data,
            newData
        ]
    }

}

export default KanbanPartition