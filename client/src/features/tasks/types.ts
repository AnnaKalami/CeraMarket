export type Task = {
    id: number;
    description: string;
    price:number;
    user_id: number;
    TaskGallery: TaskGallery
    TaskAnswers: Answer[]|[]
  };
  export type Answer = {
    id:number
    text:string
    price: number
    task_id:number
    user_id:number
    createdAt:Date

  }
export type TaskGallery = {
    id: number;
    task_id: number;
    TaskImages: TaskImage[]|[]
  };
export type TaskImage = {
    id: number;
    path: string;
    taskGallery_id: number;
  };
  
  export type TaskId = Task['id'];
  
  export type TaskWithOutId = Omit<Task, 'id'|'TaskGallery'| 'user_id'| 'TaskAnswers'>;
  export type AnswerWithOutId = Omit<Answer, 'id'|'TaskGallery'| 'user_id'| 'createdAt'>;

  
  export type TasksState = {
    tasks: Task[];
    error: string | undefined;
    // loading: boolean;
  };
  
