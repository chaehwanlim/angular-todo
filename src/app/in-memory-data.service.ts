import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './data';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const todos: Todo[] = [
      {
        work: "CS 처리",
        done: true,
        due: null
      },
      {
        work: "Angular Toy Project",
        done: false,
        due: null
      },
      {
        work: "코드 스타일 회의",
        done: false,
        due: null
      },
      {
        work: "MongoDB Structure Research",
        done: false,
        due: null
      }
    ]

    return {todos};
  }
}
