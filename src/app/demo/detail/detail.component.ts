import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  public currentId: any;

  constructor(private route: ActivatedRoute) {

    this.currentId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
