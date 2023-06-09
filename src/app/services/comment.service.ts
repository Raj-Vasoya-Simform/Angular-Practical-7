import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export default class CommentService {

  constructor( private route: ActivatedRoute) {}

  private commentPostIdSubject = new BehaviorSubject<string>('');
  comment$ = this.commentPostIdSubject.asObservable();
  comments: string[] = [];

  addComment(comment: string, postId: string) {
    if (comment.trim() !== '') {
      this.commentPostIdSubject.next(postId);
    }
  }

  getCommentPostId(): string {
    return this.commentPostIdSubject.getValue();
  }

  getIDFromURL(): number {
    return this.route.snapshot.params['id'];
  }

  setComment(comment: string) {
    this.comments.push(comment);
  }

  getComment() {
    return this.comments;
  }

}
