import { expect } from "chai";
import fetch from "node-fetch";

export interface TodoTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Geo {
  lat: string;
  lng: string;
}
interface Adress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Adress;
  phone: string;
  website: string;
  company: Company;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const URL = "https://jsonplaceholder.typicode.com";
const NUMBER_OF_TODOS = 200;

export enum resource {
  POSTS = "posts",
  COMMENTS = "comments",
  ALBUMS = "albums",
  PHOTOS = "photos",
  TODOS = "todos",
  USERS = "users",
}
class JSONPlaceholder {
  get randomId(): number {
    return Math.floor(Math.random() * NUMBER_OF_TODOS) + 1;
  }

  getRandomTodo = async (): Promise<TodoTask> => {
    const response = await fetch(`${URL}/${resource.TODOS}/${this.randomId}`);
    expect(response.status).to.equal(200);

    const task: TodoTask = await response.json();
    expect(typeof task.id).to.equal("number");
    expect(typeof task.userId).to.equal("number");
    expect(typeof task.title).to.equal("string");
    expect(typeof task.completed).to.equal("boolean");
    return task;
  };

  getPosts = async (): Promise<Array<Post>> => {
    const response = fetch(`${URL}/${resource.POSTS}`);
    expect(response.status).to.equal(200);

    const posts: Array<Post> = await response.json();
    return posts;
  };

  deletePost = async (id): Promise<any> => {
    const response = await fetch(`${URL}/${resource.POSTS}/${id}`, { method: "delete" });
    expect(response.status).to.equal(200);
    const body: any = await response.json();
    return body;
  };

  patchPost = async (post: Post): Promise<Post> => {
    const response = await fetch(`${URL}/${resource.POSTS}/${post.id}`, {
      method: "patch",
      body: JSON.stringify(post),
    });
    expect(response.status).to.equal(200);

    const updatedPost = await response.json();
    return updatedPost;
  };

  putPost = async (post: Post): Promise<Post> => {
    const response = await fetch(`${URL}/${resource.POSTS}/${post.id}`, {
      method: "put",
      body: JSON.stringify(post),
    });
    expect(response.status).to.equal(200);

    const updatedPost = await response.json();
    return updatedPost;
  };
}

export default new JSONPlaceholder();
