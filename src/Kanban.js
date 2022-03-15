const KanbanIssueTypes = {
    BUG: "bug",
    FEATURE: "feature"
}

const KanbanPriorityTypes = {
    HIGH: 16,
    MEDIUM: 4,
    LOW: 1
}

class KanbanData {
    constructor(name, description) {
        this.id = generateUUID()
        this.name = name
        this.description = description
        this.issueType = KanbanIssueTypes.FEATURE
        this.priority = KanbanPriorityTypes.MEDIUM
    }

    getID() {
        return this.id
    }

    setID() {
        throw new Error("ID cannot set manually")
    }

    getName() {
        return this.name
    }

    setName(value) {
        this.name = value
    }

    getDescription() {
        return this.description
    }

    setDescription(value) {
        this.description = value
    }

    getPriority() {
        return this.priority
    }

    setPriority(priority) {
        const types = Object.values(KanbanPriorityTypes)
        if(!types.includes(priority)) throw new Error(`Priority must be this values [${types.join(", ")}]`)
        this.priority = priority
    }

    getIssueType() {
        return this.issueType
    }

    setIssueType(issueType) {
        const types = Object.values(KanbanIssueTypes)
        if(!types.includes(issueType)) throw new Error(`IssueType must be this values [${types.join(", ")}]`)
        this.issueType = issueType
    }

}

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

    appendData(newData) {
        if(!(newData instanceof KanbanData)) throw new Error(`Data must be KanbanData model`)
        this.data = [...this.data, newData]
    }

    removeData(uuid) {
        this.data = this.data.filter(item => item.id !== uuid)
    }

    createNewData(name, description) {
        let newData = new KanbanData(name, description)
        this.data = [
            ...this.data,
            newData
        ]
    }

}

class Kanban{
    //wardrobe
    //hole
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

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}