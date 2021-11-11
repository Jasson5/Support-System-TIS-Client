import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lanfing-page',
  templateUrl: './lanfing-page.component.html',
  styleUrls: ['./lanfing-page.component.scss']
})
export class LanfingPageComponent implements OnInit {
  public backgorudImage = "../../../assets/images/font.jpeg";
  constructor() { }

  ngOnInit(): void {
    if(screen.width < 1024){
      this.backgorudImage = "../../../assets/images/font-tall.png";
    }
    if(screen.width < 768){
      this.backgorudImage = "../../../assets/images/font-medium.png";
    }
    if(screen.width < 480){
      this.backgorudImage = "../../../assets/images/font-mini.png";
    }
  }
}
