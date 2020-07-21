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
  searchInput: string;

  constructor(private todoService: TodoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  selectedTodo: Todo;
  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
    this.messageService.add(`TodosComponent: Selected Todo | {todo.work}`);
    console.log(todo.work);
  }

  clearSearch(): void {
    this.searchInput = '';
  }

  add(newWork: string): void {
    if (newWork.length === 0) {
      return;
    }
    console.log('추가한다');

    /* work = work.trim();
    if(!work) return;

    this.todoService.addTodo({ work } as Todo)
      .subscribe(todo => {
        this.todos.push(todo);
      }) */

    const newTodo = {
      work: newWork,
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

}
