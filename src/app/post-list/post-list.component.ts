import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import CommentService from '../services/comment.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  comment: number;
  commentCount: number;

  constructor(
    private router: Router,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.commentCount = this.commentService.comments.length;
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

  updatePost(id: number) {
    this.router.navigate(['/edit-post', id]);
  }

  addComment(id: number): void {
    this.router.navigate(['/add-comment', id]);
  }

  isCommentMatchingPostId(postId: number): boolean {
    const commentPostId = +this.commentService.getCommentPostId();
    return commentPostId !== undefined && commentPostId === postId;
  }
}
