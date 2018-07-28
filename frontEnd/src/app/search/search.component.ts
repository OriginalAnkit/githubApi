import { Component, OnInit } from '@angular/core';
import { appService } from '../services/appService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  repo = "";
  stack = "";
  order = "order";
  sort = "sort";
  selRepo: any;
  searches: any[];
  constructor(public appSer: appService) { }

  ngOnInit() {
    this.appSer.getSearch().subscribe((res: any) => {
      this.searches = JSON.parse(res._body).search
    })
  }
  onRepoSearch() {
    var find = false;
    this.searches.forEach(e => {
      if (e.name == this.repo && e.language == this.stack) {
        find = true;
      }
    }
    );
    if (!find) {
     if(this.searches.length>=5){
       this.searches.pop();
     }
     this.searches.push({
       name:this.repo,
       language:this.stack
     })
    }
    // console.log(this.searches);
    this.appSer.addSearches(this.searches);
    this.appSer.loader = true;
    this.appSer.searchRepo({
      name: this.repo,
      language: this.stack,
      sort: this.sort,
      order: this.order
    })

  }

  selectedRepo(i) {
    console.log(i);
    this.selRepo = this.appSer.oneRepo(i)
  }

  recentSearch(i) {
    this.appSer.loader = true;
    this.appSer.searchRepo({
      name: this.searches[i].name,
      language: this.searches[i].language
    })
  }
}
