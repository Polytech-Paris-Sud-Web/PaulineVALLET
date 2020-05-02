import {Component, Input, Output, OnInit} from '@angular/core';
import {Article} from '../models/article';
import { EventEmitter } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../services/article.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  article: Article;

  @Output()
  deletedArticle : EventEmitter<Article> = new EventEmitter();

  constructor(private route: ActivatedRoute, private articleService : ArticleService) {

  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      if (params && params['id']){
        this.articleService.get(params['id']).subscribe(fetchedArticle => this.article = fetchedArticle);
      }
    });
  }

  delete(){
    this.deletedArticle.emit(this.article);
  }

  search(){
    let title = document.getElementById("searchTitle")['value'];
    console.log(title)

    if(title == ""){
      document.getElementById("searchResult").style.color = "initial";
      this.findAll();
    }
    else{
      this.articleService.getAll().subscribe((articles) => {
        this._articles = articles.filter(e => {
          if((e.title.includes(title) && title!="") || (e.content.includes(content) && content!="") || (e.authors.includes(authors) && authors !="")){
            return e;
          }
        });
        document.getElementById("searchResult").style.color = this._articles.length!=0 ? "initial" : "red";
        this.nbResultsFounded = this._articles.length;
      })
    }
}
