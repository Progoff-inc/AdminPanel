import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.less']
})
export class DocumentComponent implements OnInit {
  @Input() type:string;
  @Input() href:string;
  @Input() text:string;
  constructor() { }

  ngOnInit() {
  }

  getValue(v){
    if(v){
        return v.split('__')[1];
    }
  }

}
