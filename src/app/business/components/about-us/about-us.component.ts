import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export default class AboutUsComponent {}
