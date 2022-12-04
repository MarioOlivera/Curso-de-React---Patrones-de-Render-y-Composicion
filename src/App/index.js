import React from "react";

import {TodoHeader} from '../TodoHeader'
import {TodoCounter} from '../TodoCounter'
import {TodoSearch} from '../TodoSearch'
import {TodoList} from '../TodoList'
import {TodoItem} from '../TodoItem'
import {TodoForm} from '../TodoForm'
import {CreateTodoButton} from '../CreateTodoButton'
import { Modal } from './../Modal'
import { TodosError } from './../TodosError'
import { TodosLoading } from './../TodosLoading'
import { TodosEmpty } from './../TodosEmpty'

import {ChangeAlert} from './../ChangeAlert'

import { useTodos } from './useTodos'

function App(props) {

    const {  
        error,
        loading,
        searchedTodos,
        completeTodos,
        totalTodos,
        completedTodos,
        deleteTodo,
        openModal,
        setOpenModal,
        searchValue,
        setSearchValue,
        addTodo,
        sincronize
    } = useTodos()

    return (
    <React.Fragment>

        <TodoHeader loading={loading}>
            <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos}/>
            <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue}/>
        </TodoHeader>

        <TodoList
            error={error}
            loading={loading}
            searchedTodos={searchedTodos}
            totalTodos={totalTodos}
            searchValue={searchValue}
            onError={() => <TodosError></TodosError>}
            onLoading={() => <TodosLoading></TodosLoading>}
            onEmptyTodos={() => <TodosEmpty></TodosEmpty>}
            onEmptySearchResults={(searchText) => <p>No hay resultados para '{searchText}'</p>}
            /*render={(todo) => (
                    <TodoItem 
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed} 
                        onComplete={() => completeTodos(todo.text)}
                        onDeleteTodo={() => deleteTodo(todo.text)}
                    />
                )
            }*/
        >

            {(todo) => (
                    <TodoItem 
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed} 
                        onComplete={() => completeTodos(todo.text)}
                        onDeleteTodo={() => deleteTodo(todo.text)}
                    />
                )
            }
        </TodoList>

        {openModal == true &&
            <Modal>
                <TodoForm addTodo={addTodo} setOpenModal={setOpenModal}></TodoForm>
            </Modal>
        }
        <CreateTodoButton setOpenModal={setOpenModal} openModal={openModal}/>

        <ChangeAlert sincronize={sincronize}></ChangeAlert>
    </React.Fragment>);
}

export default App;