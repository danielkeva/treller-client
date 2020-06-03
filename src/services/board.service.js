let board = {

    theme: 'white',
    id: 'board1',
    userId: '',
    users: [],
    lists: [
        {
            id: 'list1',
            title: 'This is the list title',
            theme: 'white',
            tasks: [
                {
                    id: 'task1',
                    title: 'This is the task title',
                    description: 'This is the task description',
                    creatorId: '',
                    membersId: [],
                    comments: [],
                    dueDate: '',
                    labels: [
                        {
                            title: '',
                            color: 'white',
                        }
                    ],
                    isDone: false,
                    attachment: '',
                }
            ]
        }
    ]

}
export const boardService = {
    query,
    getTaskById,
    // getById,
    // remove,
    save    // add,
    // updateWap,
    // makeId,
    // replaceIds
}

function query() {
    return board
}
function getTaskById(taskId) {
    const task = board.lists.tasks.find(currTask => currTask.id === taskId)
    return task
}


function save(newBoard) {
    board = newBoard
    return board
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}