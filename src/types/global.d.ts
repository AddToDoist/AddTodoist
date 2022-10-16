import type { Task } from '@doist/todoist-api-typescript';
import type { Document } from 'mongoose';

declare global {
  type DBUserInstance = Document<unknown, any, IUserInfo> & IUserInfo & Required<{ _id: string }>

  type URLEntity = {
    url: string,
    expanded_url: string,
    display_url: string,
    indices: [number, number]
  }
  type TWDirectMessage = {
    target: Record<string, unknown>;
    sender_id: string;
    sender_name: string;
    message_data: {
      text: string;
      entities: {
        hashtags: { text: string, indices: any[] }[];
        symbols: any[];
        user_mentions: any[];
        urls: URLEntity[];
      };
    };
  };

  type CustomTask = {content: string, token: string, projectId?: string, labels?: string[], parentId?: string, order?: number }

  type TodoistTaskAdder = (task: CustomTask) => Promise<Task>;

  type DMHandlerFunction = (message: TWDirectMessage, user: DBUserInstance) => Promise<void>;

  interface IUserInfo {
    /**
     * Unique user id
     */
    _id: string;
    /**
     * Todoist **encrypted** token
     */
    todoistToken: string;
    /**
     * The todoist projectId to add tasks to
     */
    todoistProjectId: string;
    /**
     * An object that contains the user's settings
     */
    todoistSettings?: Record<string, string> | null
  }

}

export { };
