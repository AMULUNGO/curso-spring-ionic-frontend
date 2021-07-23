import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { EstadoService } from '../../services/domain/estado.service';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        nome: ['Mercia Mulungo', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['merciazacarias32@gmail.com', [Validators.required, Validators.email]],
        tipoCliente: ['1', [Validators.required]],
        nuit: ['06134596280', [Validators.required, Validators.minLength(9), Validators.maxLength(14)]],
        senha: ['123', [Validators.required]],
        logradouro: ['Rua Augusto Mapanga', [Validators.required]],
        numero: ['06', [Validators.required]],
        complemento: ['M26', []],
        bairro: ['Chamissava', [Validators.required]],
        quarteirao: ['M26', [Validators.required]],
        telefone1: ['827148513', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    }, error => {

    });
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe( response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error => {

    });
  }

  signupUser() {
    console.log()
    this.clienteService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    }, error => {

    });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efectuado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
