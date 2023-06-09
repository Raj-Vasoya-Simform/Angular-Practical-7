import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import CommentService from '../services/comment.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: Post;
  comment: string;
  userComment: string[];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPost();
    this.commentService.comment$.subscribe((comment) => {
      this.comment = comment;
    });
    this.userComment = this.commentService.getComment();
  }

  getPost(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.postService.getPost(id).subscribe((post) => (this.post = post));
    });
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

  isCommentMatchingPostId(postId: number): boolean {
    const commentPostId = this.commentService.getCommentPostId();
    return commentPostId !== undefined && commentPostId === postId.toString();
  }

  onDeleteComment(index: number): void {
    if (index >= 0 && index < this.userComment.length) {
      this.userComment.splice(index, 1);
    }
  }
}
