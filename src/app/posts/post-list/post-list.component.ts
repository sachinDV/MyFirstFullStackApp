import { Component,OnInit,OnDestroy } from "@angular/core";


import{Post} from '../post.model';
import {PostsService} from '../post.service';
import { Subscription } from 'rxjs';
import { AuthService } from "../../auth/auth.service";


@Component({
selector:"app-post-list",
templateUrl:"./post.list.component.html",
styleUrls:["./post-list.component.css"]

})

export class PostListComponent implements OnInit, OnDestroy{

  posts: Post[] = [];
  private postsSub : Subscription;
  private authListenerSubs:Subscription;
  userIsAuthenticated = false;

  constructor(public postsService: PostsService, private authService:AuthService) {
  }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts:Post[]) =>{
      this.posts = posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.
    getAuthStatusListener().
    subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
      })

  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }


}
