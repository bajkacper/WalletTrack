import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WalletTrack';
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let loader = this.renderer.selectRootElement('#loader');
      if (loader.style.display != "none") loader.style.display = "none"; 
      console.log("test view init")
    }
  }
}
