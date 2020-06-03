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
    },
    mutations: {
        setBoard(state, { board }) {
            state.board = board
        },
        setTask(state, { taskId }) {
            state.board.lists.forEach(list => {
                let currTask = list.tasks.find(task => task.id === taskId)
                if (currTask) state.currTask = currTask
            })
        }
    },
    actions: {

        loadBoard(context) {
            const board = boardService.query()
            context.commit({ type: 'setBoard', board })
            return board
        },
        updateTask(context, { task }) {
            context.commit({ type: 'setTask', task: task.id })
            const boardCopy = JSON.parse(JSON.stringify(context.state.board))
            boardCopy.lists.forEach(list => {
                let idx = list.tasks.findIndex(currTask => currTask.id === task.id)
                list.tasks.splice(idx, 1, task)
            })
            context.dispatch({ type: 'saveBoard', board: boardCopy })
        },
        saveBoard(context, { board }) {
            const savedBoard = boardService.save(board)
            context.commit({ type: 'setBoard', board: savedBoard })
        }
    }

})

