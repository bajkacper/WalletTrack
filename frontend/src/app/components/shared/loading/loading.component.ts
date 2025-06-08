import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    NgxLoadingModule
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  loading: boolean = false;
  loading$ = this.loadingService.loading;

  constructor(private loadingService: LoadingService){ }

  ngOnInit(){
    this.loadingService.loading.subscribe(status =>{
      this.loading = status;
    })
  }
}
