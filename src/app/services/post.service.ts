import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`);
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Post>(url);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`https://jsonplaceholder.typicode.com/posts`, post);
  }

  updatePost(post: Post): Observable<Post> {
    const postData = {
      [post.id]: { title: post.title, description: post.body },
    };
    return this.http.put<Post>(`https://jsonplaceholder.typicode.com/posts/${post.id}`, postData);
  }

  deletePost(id: number): Observable<void> {
    const confirmed = confirm('Are you sure you want to delete the post?');

    if (!confirmed) {
      return EMPTY;
    }

    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}
