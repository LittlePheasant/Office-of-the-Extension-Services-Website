import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  currentSection!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string | null) => {
      if (fragment !== null) {
        this.currentSection = fragment;
      } else {
        // Set a default section here, like the first section you want to show
        this.currentSection = 'aboutus';
      }
    });
  }
}
