import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Todo } from './data';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl = 'api/todos';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( 
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET: 서버에서 히어로 목록 가져오기 */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(_ => this.log('fetched todos')),
        catchError(this.handleError<Todo[]>('getTodos', []))
      )
  }

  /** POST: 서버에 새로운 히어로를 추가합니다. */
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      tap((newTodo: Todo) => this.log(`added todo `)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금은 콘솔에 로그를 출력합니다.
  
      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);
  
      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`TodoService: ${message}`);
  }
}
