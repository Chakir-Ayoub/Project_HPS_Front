import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { View } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  //template:'<ejs-schedule height="850"  [selectedDate]="setDate"  [currentView]="setview"></ejs-schedule>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HPS_Project_Front';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}


  ngOnInit(): void {
    const nav = this.elementRef.nativeElement.querySelector('.nav');
    const nav2 = this.elementRef.nativeElement.querySelector('.nav2');
    const mySidenav = this.elementRef.nativeElement.querySelector('#mySidenav');
    const main = this.elementRef.nativeElement.querySelector('#main');
    const logo = this.elementRef.nativeElement.querySelector('.logo');
    const logoSpan = this.elementRef.nativeElement.querySelector('.logo span');
    const iconA = this.elementRef.nativeElement.querySelector('.icon-a');
    const icons = this.elementRef.nativeElement.querySelector('.icons');
  
    nav.addEventListener('click', () => {
      this.renderer.setStyle(mySidenav, 'width', '70px');
      this.renderer.setStyle(main, 'margin-left', '70px');
      this.renderer.setStyle(logo, 'visibility', 'hidden');
      this.renderer.setStyle(logoSpan, 'visibility', 'visible');
      this.renderer.setStyle(logoSpan, 'margin-left', '-10px');
      this.renderer.setStyle(iconA, 'visibility', 'hidden');
      this.renderer.setStyle(icons, 'visibility', 'visible');
      this.renderer.setStyle(icons, 'margin-left', '-8px');
      this.renderer.setStyle(nav, 'display', 'none');
      this.renderer.setStyle(nav2, 'display', 'block');
    });
  
    nav2.addEventListener('click', () => {
      this.renderer.setStyle(mySidenav, 'width', '300px');
      this.renderer.setStyle(main, 'margin-left', '300px');
      this.renderer.setStyle(logo, 'visibility', 'visible');
      this.renderer.setStyle(iconA, 'visibility', 'visible');
      this.renderer.setStyle(icons, 'visibility', 'visible');
      this.renderer.setStyle(nav, 'display', 'block');
      this.renderer.setStyle(nav2, 'display', 'none');
    });
  }
  

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#1f233a';
}

}
