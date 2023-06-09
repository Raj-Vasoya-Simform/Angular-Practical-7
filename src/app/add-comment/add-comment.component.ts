import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import CommentService from '../services/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnInit {
  selectedPost: Post;
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.getPostDetails();

  }

  getPostDetails(): void {
    const postId = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(postId).subscribe((post) => {
      this.selectedPost = post;
    });
  }

  addComment(comment: string, id: number): void {
    if (comment.trim() === '') {
      alert('Please add a comment');
      return;
    }

      this.commentService.setComment(comment);
      this.commentService.addComment(comment, id.toString());


    this.newComment = '';
    this.router.navigate(['/posts']);
  }
}
