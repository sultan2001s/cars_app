import { Component, HostListener } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";
import {subscribeOn} from "rxjs/operators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  });

  carsData: any;

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData);
  }

  goScroll(target: HTMLElement) {
    target.scrollIntoView({behavior: "smooth"})
  }

  category: string = 'sport';
  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
  }

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.1 * window.scrollY) + 'px'};
  }

  // scrollTop: any;
  // @HostListener('document:calcScrollValue', ['$event'])
  // topScroll() {
  //   this.scrollTop = {}
  // }

  onSubmit() {
    if (this.priceForm.valid) {
      this.appService.sendQuery(this.priceForm.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message);
              this.priceForm.reset()
            },
            error: (response) => {
              alert(response.error.message)
            }
          }
        );
    }
  }
}
