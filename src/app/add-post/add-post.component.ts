import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  newPost: Post = {
    title: '',
    body: '',
  };

  constructor(private postService: PostService, private router: Router) {}

  addPost(): void {
    this.postService.addPost(this.newPost).subscribe((post) => {
      console.log(
        `Post Added Successfully :- Title :- ${post.title} / Body : -${post.body}`
      );
      this.router.navigate(['/posts']);
    });
  }
}
