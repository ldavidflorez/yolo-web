import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../services/crud.service';
@Component({
  selector: 'app-inf-list',
  templateUrl: './inf-list.component.html',
  styleUrls: ['./inf-list.component.css']
})
export class InfListComponent implements OnInit {

  inferences: any = [];

  constructor(private crud: CrudService) { }

  ngOnInit(): void {
    this.crud.getInferences().subscribe(
      res => {
        this.inferences = res;
      },
      err => console.log(err),
    )
  }

  deleteItem(id: string) {
    this.crud.deleteInference(id).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err),
    );
  }

}
