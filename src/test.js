const kanban = new Kanban()
let examplePartition = new KanbanPartition("Backlog")
examplePartition.appendData({d: "a"})
let exampleData = new KanbanData("Kanban değişimi", "Kanban partition arası veri aktarımı")
examplePartition.appendData(exampleData)
kanban.createNewPartition(p)

//

const kanban = new Kanban()
kanban.createNewPartition("Backlog")
kanban.getPartition("backlog").createNewData("İşimiz", "Açıklamamız")