import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AlertController, AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.page.html',
  styleUrls: ['./reclamo.page.scss'],
})

export class ReclamoPage implements OnInit {

  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;
  private animation!: Animation;

  tipo: string = '';
  reclamo: string = '';
  errorMessages: any = {};
  tipoErrorShown: boolean = false;
  reclamoErrorShown: boolean = false;

  constructor(
    private alertController: AlertController, 
    private animationCtrl: AnimationController
  ) {}

  ngAfterViewInit() {
    const card = this.animationCtrl
      .create()
      .addElement(this.cardElements.get(0)!.nativeElement)
      .duration(2000)
      .beforeStyles({
        filter: 'invert(75%)',
      })
      .beforeClearStyles(['box-shadow'])
      .afterStyles({
        'box-shadow': 'rgba(255, 0, 50, 0.4) 0px 4px 16px 6px',
      })
      .afterClearStyles(['filter'])
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.5)' },
        { offset: 1, transform: 'scale(1)' },
      ]);

    // this.animation = this.animationCtrl.create().duration(2000).addAnimation([card]);
  }

  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    // this.animation.stop();
  }

  validatereclamo(){
    if(this.reclamo && this.reclamo.length > 10 && this.reclamo.length <= 500 )
    {
      this.errorMessages.reclamo = '';
      this.reclamoErrorShown = false;
    }else{
      this.errorMessages.reclamo = 'Debe ingresar por lo menos una descripcion de 10 caracteres.';
      if (!this.reclamoErrorShown) {
        this.reclamoErrorShown = true;
      }
    }
  }

  validatetipo(){
      if (!this.tipo) {
        this.errorMessages.tipo = 'Por favor, selecciona un tipo de problema.';
        if (!this.tipoErrorShown) {
          this.tipoErrorShown = true;
        }
      } else {
        this.errorMessages.tipo = '';
        this.tipoErrorShown = false;
      }
  }

    // Función para mostrar alerta de validación
   async showAlert(message: string) {
      const alert = await this.alertController.create({
        header: 'Error de Validación',
        message: message,
        buttons: ['OK'],
      });
      await alert.present();
    }
  
     // Función para validar si todos los campos son válidos
  areAllValid(): boolean {
      // Verifica que todos los campos no tengan errores
      return (
        !this.errorMessages.tipo &&
        !this.errorMessages.reclamo
      );
    }

  async enviarreclamo(){
      this.validatereclamo();
      this.validatetipo();
      if (this.areAllValid()) {
      // Lógica en donde se debe enviar el reclamo a la BD.
      const alert = await this.alertController.create({
        header: 'Reclamo recibido',
        subHeader: 'Su reclamo a sido derivado con la administracion',
        message: 'Gracias por su comentario',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error al generar reclamo',
        subHeader: 'No se a podido generar tu solicitud',
        message: 'Disculpe las molestias.',
        buttons: ['OK'],
      });
      await alert.present();
      }
    }

  ngOnInit() {
  }

}
