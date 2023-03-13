import { Component } from '@angular/core';
//Validaciones
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  //Variable que va en la etiqueta <form></form
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  //Validaciones de formularios en el constructor
  constructor(private fb: FormBuilder, private _product: ProductService,
    private router: Router, private toastr: ToastrService, private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],

    })
    //obtenemos el id para editar
    this.id = Number(aRouter.snapshot.paramMap.get('id'))
    console.log(this.id);
  }

  //Inicializa el componente
  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar '
      this.getProduct(this.id);

    }
  }

  //Metodo
  //Este metodo se ejecuta en el boton del formulario
  addProduct() {

    //¿Como obtengo los valores del formulario?

    console.log(this.form.value.name);
    console.log(this.form.get('name')?.value);

    //Obtener los datos del formulario
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,

    }

    this.loading = true;

    if (this.id !== 0) {
      //Editar
      product.id = this.id;
      this._product.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${product.name} se ha actualizado Correctamente`, 'Producto actualizado')
        this.router.navigate(['/'])
        this.loading = false;
      })

    } else {
      //agregar
      this._product.saveProduct(product).subscribe(() => {
        console.log("Producto agregado");
        this.toastr.success(`El producto ${product.name} se ha agregado Correctamente`, 'Producto registrado')
        this.router.navigate(['/'])
        this.loading = false;
      });
    }


  }

  getProduct(id: number) {
    this.loading = true;

    this._product.getProductbyId(id).subscribe((data: Product) => {
      console.log(data);

      this.loading = false;

      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock

      })
    })
  }
}
