import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; //Importamos el toast
import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

  //Arreglo de productos
  listProduct: Product[] = []
  loading: boolean = false;

  constructor(private _productService: ProductService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getProduct();
  }
//Obtener la lista
  getProduct() {
    this.loading = true; //loading
    //Devuelve un observable y nos sucribimos
    this._productService.getProduct().subscribe((data: Product[]) => {
      console.log(data);
      this.listProduct = data;
      this.loading =false;
    })

  }

  //Eliminar
  deleteProduct(id: number){
    this.loading = true;
    this._productService.deleteProduct(id).subscribe( () => {
      this.getProduct();
      this.toastr.warning('El producto fue eliminado con Exito','Producto Eliminado')
    })
  }

}

