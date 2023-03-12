import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public post2:Post;
  public post3: Post;
  public postList: Post[];

  private communityTag= new BehaviorSubject<string>("");
  private titleToDelete= new BehaviorSubject<string>("");
  private post = new Post();
  private postsList= new BehaviorSubject<Post[]>([this.post]);
  private postsListTagged= new BehaviorSubject<Post[]>([this.post]);
  communityList:string[]=[
    "Fantasy",
    "Essay",
    "Commedy",
    "Fiction",
    "Horror",
    "Romance",
    "Adventure"
  ];

  currentCommunityTag= this.communityTag.asObservable();
  currentTitleToDelete = this.titleToDelete.asObservable();
  currentListPosts = this.postsList.asObservable();
  currentListTaggedPosts = this.postsListTagged.asObservable();

  constructor() {
    this.post= new Post();
    this.post2= new Post();
    this.post3 = new Post();


    this.postList=[this.post];

    this.post.title="Let it be so";
    this.post2.title= "Love and Hate";
    this.post3.title= "Suffering";

    // this.post.date="03/08/2023";
    // this.post2.date="02/01/1992";
    // this.post3.date="01/03/2023";
    this.post.content=
    "Let it be so. Let the world be without the intent to change it\nLet life flow without interfering.\n Interference is suffering\nInference is ignroance\nInterfernce is the way of the ego, of misunderstanding";
    this.post2.content = this.post.content;
    this.post3.content = this.post.content;

    this.post.label="Fiction";
    this.post2.label="Romance";
    this.post3.label="Commedy";

    this.postList.push(this.post2);
    this.postList.push(this.post3);
    this.updatePostList(this.postList);

  }
  updateCommunityTag(tag:string){
    this.communityTag.next(tag);
  }
  updatePostList(postList:Post[]){
    this.postsList.next(postList);

  }
  updatePostListTagged(postTag:Post[]){
    this.postsListTagged.next(postTag);

  }
  deleteTitle(title:string){
    this.titleToDelete.next(title);
  }
}
