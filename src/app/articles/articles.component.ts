import {Component, OnInit} from '@angular/core';
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  nb: number; //nombre de resultats de la recherche
  private _articles: Observable<Article[]>;

  constructor(private articleService: ArticleService) {
  }

  articles(): Observable<Article[]> {
    return this._articles;
  }

  ngOnInit() {
    this.findAll();
  }

  delete(article: Article){
    this.articleService.delete(article.id).subscribe(()=>{
      this.findAll();
    });
  }

  newArticle(article: Article){
    this.findAll();
  }

  private findAll() {
    this.articleService.getAll().subscribe((articles) => {
      this._articles = articles;
      this.nb = this._articles.length;
    });
  }
  search(){
    let title = document.getElementById("Title")['value'];
    console.log(title)
    if (title == ""){
      document.getElementById("Result");
      this.findAll();
    }
  }
}
