import { Component, OnInit } from '@angular/core';
import { Todo } from '../data';
import { TodoService } from '../todo.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  todos: Todo[];
  filteredTodos: Todo[];
  searchInput: string;
  todoInput: string;
  todoDateInput: Date | null;
  selectedTodo: Todo;
  searchEnabled: boolean = false;

  constructor(
    private todoService: TodoService, 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  filterTodos() {
    if (this.searchInput === undefined || this.searchInput === '') {
      return this.todos;
    } else {
      return this.todos.filter((todo) => todo.work.toLowerCase().includes(this.searchInput.toLowerCase()));
    }
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
    this.messageService.add(`TodosComponent: Selected Todo | {todo.work}`);
  }

  clearSearch(): void {
    this.searchInput = '';
  }

  add(): void {
    if (this.todoInput.length === 0) {
      return;
    }

    const newTodo = {
      work: this.todoInput,
      due: null,
      done: false
    }

    this.todos.push(newTodo);
  }

  toggle(idx: number): void {
    this.todos[idx].done = !this.todos[idx].done;
  }

  edit(todo: Todo): void {

  }

  delete(idx: number): void {
    this.todos.splice(idx, 1);
  }

  clearAdd(): void {
    this.todoInput = '';

  }

}

