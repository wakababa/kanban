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
    moveData(toPartition,data){
        const copyStore = this.store
        const toIndex = this.store.findIndex(store=>store.name ===toPartition)
        copyStore[toIndex].data =[...copyStore[toIndex].data,data]
        this.store = copyStore
    }
    editData(partitionName,data){
        const copyStore = this.store
        const index = this.store.findIndex(store=>store.name ===partitionName)
        const dataIndex = copyStore[index].data.findIndex(d=>d.id ===data.id)
        copyStore[index].data[dataIndex] =data
        this.store = copyStore
    }
}

export default Kanban