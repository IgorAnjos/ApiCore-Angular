import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clienteForm: FormGroup;
  public title = 'Clientes';
  public clienteSelected: Cliente;

  public clientes: Cliente[];

  constructor(private fb: FormBuilder,
              private clienteService: ClienteService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.getAll().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  createForm(){
    this.clienteForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required]
    });
  }

  saveCliente(cliente: Cliente) {
    this.clienteService.put(cliente).subscribe(
      (cliente: Cliente) => {
        console.log(cliente);
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  clienteSubmit(){
    this.saveCliente(this.clienteForm.value);
  }

  clienteSelect(cliente: Cliente){
    this.clienteSelected = cliente;
    this.clienteForm.patchValue(cliente);
  }

  voltar(){
    this.clienteSelected = null;
  }

}
