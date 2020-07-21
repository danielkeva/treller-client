import { boardService } from '../services/board.service.js'
export default ({
    state: {
        board: null,
        currTask: null
    },
    getters: {
        board(state) {
            return state.board;
        },
        currTask(state) {
            return state.currTask;
        },
        labels(state) {
            return state.board.labels
        },
        taskLists(state) {
            return state.board.taskLists
        },

    },
    mutations: {
        setBoard(state, { board }) {
            state.board = board
        },
        setTask(state, { task }) {
            state.currTask = task;
        }
    },
    actions: {

        async loadBoard(context) {
            const board = boardService.query()
            context.commit({ type: 'setBoard', board })
            return board
        },
        async loadTask(context, { taskId }) {
            const task = boardService.getTaskById(taskId)
            context.commit({ type: 'setTask', task })
            return task
        },
        updateTask(context, { task }) {
            context.commit({ type: 'setTask', task })
            const boardCopy = JSON.parse(JSON.stringify(context.state.board))
            boardCopy.taskLists.forEach(taskList => {
                let idx = taskList.tasks.findIndex(currTask => currTask.id === task.id)
                if (idx !== -1) {
                    taskList.tasks.splice(idx, 1, task)
                }
            })
            context.dispatch({ type: 'saveBoard', board: boardCopy })
        },
        removeTask(context, { taskId }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board))
            // boardCopy.taskLists.filter(taskList => taskList.id === listId)
            
            boardCopy.taskLists.forEach(taskList => {
                let idx = taskList.tasks.findIndex(task => task.id === taskId)
                if (idx !== -1) {
                    taskList.tasks.splice(idx, 1)
                }
                context.dispatch({ type: 'saveBoard', board: boardCopy })
            })
        },
        updateTaskList(context, { taskList }) {
            const boardCopy = JSON.parse(JSON.stringify(context.state.board))
            const idx = boardCopy.taskLists.findIndex(currList => currList.id === taskList.id)
            boardCopy.taskLists.splice(idx, 1, taskList)
            context.dispatch({ type: 'saveBoard', board: boardCopy })
        },
        saveBoard(context, { board }) {
            const boardCopy = JSON.parse(JSON.stringify(board));
            const savedBoard = boardService.save(boardCopy)
            context.commit({ type: 'setBoard', board: savedBoard })
        }
    }

})

