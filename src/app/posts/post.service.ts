import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {Post} from './post.model';

@Injectable({providedIn:'root'})

export class PostsService{
  private posts:Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient:HttpClient){

  }

  getPosts() {
    //return [...this.posts]
    this.httpClient.get<{message:string, posts:Post[]}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map(post => {
        return{
          title:post.title,
          content: post.content,
          id:post.id
        };
      })

    }))
    .subscribe((transformedPosts)=>{
      console.log(transformedPosts);
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title:string, content:string)
  {
    const post:Post = {id:"null", title:title, content:content}
    this.posts.push(post);
    this.httpClient.post<{message:string}>('http://localhost:3000/api/posts',post)
    .subscribe((responseData)=>{
      console.log(responseData.message);
    })
    this.postsUpdated.next([...this.posts]);
  }

  deletePost(postId:string)
  {
    this.httpClient.delete("http://localhost:3000/api/posts/"+postId)
    .subscribe(()=>{
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts])
    })
  }
}


