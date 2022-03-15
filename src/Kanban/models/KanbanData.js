import KanbanIssueTypes from "../types/KanbanIssueTypes";
import KanbanPriorityTypes from "../types/KanbanPriorityTypes";
import generateUUID from "../utils/generateUUID";

/** Class representing a KanbanData.
 * Default issueType is KanbanIssueTypes.FEATURE
 * Default priority is KanbanPriorityTypes.MEDIUM
 * @param {string} name - Name of KanbanData.
 * @param {string} description - Description of KanbanData.
 *
*/
class KanbanData {
    constructor(name, description) {
        this._id = generateUUID()
        this.name = name
        this.description = description ?? ""
        this.issueType = KanbanIssueTypes.FEATURE
        this.priority = KanbanPriorityTypes.MEDIUM
    }

    getId() {
        return this._id
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

export default KanbanData