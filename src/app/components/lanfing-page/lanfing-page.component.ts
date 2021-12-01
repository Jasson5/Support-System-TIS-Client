import { Router, ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lanfing-page',
  templateUrl: './lanfing-page.component.html',
  styleUrls: ['./lanfing-page.component.scss']
})
export class LanfingPageComponent implements OnInit{
  public backgorudImage = "../../../assets/images/font.jpeg";
  constructor(private route: ActivatedRoute) {
   }
  

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
