import { Component, OnInit } from '@angular/core';

import { Obj } from '../../models/Obj';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-inf-list',
  templateUrl: './inf-list.component.html',
  styleUrls: ['./inf-list.component.css']
})
export class InfListComponent implements OnInit {

  inferences: any = [];
  newTitle: any;
  // inference: Obj = {
  //   title: ''
  // }

  constructor(private crud: CrudService) { }

  ngOnInit(): void {
    this.getInferences();
  }

  getInferences() {
    this.crud.getInferences().subscribe(
      res => {
        this.inferences = res;
        console.log(this.inferences)
      },
      err => console.log(err),
    )
  }

  deleteItem(id: string) {
    this.crud.deleteInference(id).subscribe(
      res => {
        console.log(res);
        this.getInferences();
      },
      err => console.log(err),
    );
  }

  updateInference(id: string, inference: Obj) {
    this.newTitle = prompt('Enter a new title:');
    inference.title = this.newTitle;
    this.crud.updateInference(id, inference).subscribe(
      res => {
        console.log(res);
        this.getInferences();
      },
      err => console.log(err),
    );
  }

}
