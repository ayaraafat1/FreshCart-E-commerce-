import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{
private readonly productsService = inject(ProductsService);
private readonly categoriesService = inject(CategoriesService);
productsData:IProduct[] = [];
categoriesData:ICategory[] = [];
customMainSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay:true,
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  dots: true,
  dotsEach:5,
  rtl:true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: false
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  margin:10,
  dots: true,
  dotsEach:4,
  autoplay:true,
  autoplayTimeout:1500,
  autoplayHoverPause:true,
  rtl:true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 4
    },
    740: {
      items: 6
    },
    940: {
      items: 9
    }
  },
  nav: false
}

ngOnInit(): void {
   this.getProducts();
   this.getCategories()
}

getProducts(): void
{
this.productsService.getAllProducts().subscribe({
  next:(res)=>{
    this.productsData = res.data;
  },
  error:(err)=>{
    console.log(err)
  }
})
}

getCategories(): void
{
this.categoriesService.getAllCategories().subscribe({
  next:(res)=>{
    console.log(res.data)
    this.categoriesData = res.data;
  },
  error:(err)=>{
    console.log(err)
  }
})
}
}
