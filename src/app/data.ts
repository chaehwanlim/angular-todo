export interface Todo {
  work: string;
  done: boolean;
  due: Date | null;
}

export const todos: Todo[] = [
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
];