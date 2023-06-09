import { Component, OnInit, Input } from '@angular/core';
import CommentService from '../services/comment.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  @Input() postId: number;
  comments: Comment[];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {}
}
