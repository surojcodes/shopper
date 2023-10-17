import express from 'express'
import { createTodoHandler, deleteTodoHandler, getTodoHandler, getTodosHandler, updateTodoHandler } from '../controllers/todo.controller';
const router = express.Router();

router.route('/').get(getTodosHandler).post(createTodoHandler)
router.route('/:todoId').get(getTodoHandler).patch(updateTodoHandler).delete(deleteTodoHandler)

export default router