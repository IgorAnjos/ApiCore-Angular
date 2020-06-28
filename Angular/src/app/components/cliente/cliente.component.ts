import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clienteForm: FormGroup;
  public title = 'Clientes';
  public clienteSelected: Cliente;

  public clientes = [
    { nome: 'Igor Macedo dos Anjos'},
    { nome: 'Terezinha F. A. M. dos Anjos'},
    { nome: 'Tháis Mardini dos Anjos'}
  ];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  clienteSubmit(){
    console.log(this.clienteForm.value);
  }

  clienteSelect(cliente: Cliente){
    this.clienteSelected = cliente;
    this.clienteForm.patchValue(cliente);
  }

  voltar(){
    this.clienteSelected = null;
  }
}
