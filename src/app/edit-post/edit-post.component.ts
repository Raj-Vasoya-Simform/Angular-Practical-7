import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPost(id)
        .subscribe(post => this.post = post);
    }
  }

  updatePost(): void {
    this.postService.updatePost(this.post, )
      .subscribe((post) => {
        console.log(
          `Post Updated Successfully :- Title :- ${post.title} / Body : -${post.body}`
        );
        this.router.navigate(['/posts']);
      });
  }
}
