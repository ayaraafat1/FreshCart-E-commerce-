import { Component, inject, OnInit , ElementRef, HostListener, ViewChild} from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',

  
})
export class DetailsComponent implements OnInit {

  productDetails:IProduct |null = null
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);


  ngOnInit(): void {
      this. getProductDetails()
  }

getProductDetails():void{
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        let productId = p.get('id')
        this.productsService.getSpecificProducts(productId).subscribe({
          next:(res)=>{
            this.productDetails = res.data;
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      },
      error:(err)=>{
        console.log(err);       
      }
    })
  }
  imgId: number = 1;
  @ViewChild('imgShowcase') imgShowcase!: ElementRef;
  onImageClick(index: number): void {
    this.imgId = index + 1;
    this.slideImage();
  }

  slideImage(): void {
    if (this.imgShowcase?.nativeElement) {
      const displayWidth = this.imgShowcase.nativeElement.querySelector('img').clientWidth;
      this.imgShowcase.nativeElement.style.transform = `translateX(${-(this.imgId - 1) * displayWidth}px)`;
    }
  }

  @HostListener('window:resize') onWindowResize(): void {
    this.slideImage();
  }
}
