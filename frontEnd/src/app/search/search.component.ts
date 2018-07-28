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
  loader=false;
  selRepo:any;
  searches:any;
  constructor(private appSer: appService) { }

  ngOnInit() {
    this.appSer.getSearch().subscribe((res:any)=>{
      this.searches=JSON.parse(res._body).search
  })
  }
  onRepoSearch() {
    // console.log(this.stack);
    // console.log(this.repo);
    // console.log(this.sort);
    // console.log(this.order);
    this.loader=true;
    this.appSer.searchRepo({
      name: this.repo,
      language: this.stack,
      sort: this.sort,
      order: this.order     
    })

  }

  selectedRepo(i) {
    console.log(i);
    this.selRepo=this.appSer.oneRepo(i)
  }
}
