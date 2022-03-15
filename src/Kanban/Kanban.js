import KanbanPartition from "./models/KanbanPartition";

class Kanban{
    constructor() {
        this.store = []
    }

    setInitialStore(store) {
        this.store = store
    }

    createNewPartition(name, data = []) {
        let newPartition = new KanbanPartition(name, data)
        this.store = [
            ...this.store,
            newPartition
        ]
    }

    getPartition(key) {
        return this.store.find(p => p.key === key)
    }
}

export default Kanban