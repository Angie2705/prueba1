import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  // map!: GoogleMap; // Declara una variable para contener la referencia al mapa


  constructor() { }

  async ngOnInit() {
    const apiKey = 'AIzaSyB7MKK9PrXUZ2_BfAfxVRoi9HrVHPgHzVU';

    const mapRef = document.getElementById('map_canvas');

    // if (mapRef) {
    //   // Verifica si mapRef no es nulo
    //   const newMap = await GoogleMap.create({
    //     id: 'my-map', // Identificador único para esta instancia de mapa
    //     element: mapRef, // Proporciona el elemento HTML
    //     apiKey: apiKey, // Tu clave de API de Google Maps
    //     config: {
    //       center: {
    //         lat: -33.363421, // Latitud inicial
    //         lng: -70.678281, // Longitud inicial
    //       },
    //       zoom: 8, // Nivel de zoom inicial
    //     },
    //   });
    // } else {
    //   console.error('Elemento de mapa no encontrado.');
    // }

  }

  // ngOnInit() {
  // }

}


















// import { AlertController } from '@ionic/angular';
// import { DOCUMENT } from '@angular/common';
// import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
// import { ModalController } from '@ionic/angular';
// import { GooglemapsService } from 'src/app/components/googlemaps/googlemaps.service';
// import { Geolocation } from '@capacitor/geolocation';


// declare var google: any;

// @Component({
//   selector: 'app-mapa',
//   templateUrl: './mapa.page.html',
//   styleUrls: ['./mapa.page.scss'],
// })
// export class MapaPage implements OnInit{
//   @Input() position = {
//     lat: -2898116,
//     lng: -78.99958149999999
//   };

//   label = {
//     titulo: 'Ubicacion Actual',
//     subtitulo: 'Mi Ubicacion Actual'
//   }

//   map: any;
//   marker: any;
//   infowindows: any;
//   positionSet: any;

//   @ViewChild('map') divMap: ElementRef;

//   constructor(
//     private renderer: Renderer2, 
//     @Inject(DOCUMENT) 
//     private document, 
//     private googlemapsService: GooglemapsService, 
//     public modalController: ModalController,
//     private alertController: AlertController) {

//    }

//   ngOnInit() {
//     this.init()
//   }

//   async init() {
//     this.googlemapsService.init(this.renderer, this.document).then(() => {
//       this.initMap();
//     }).catch((err)  => {
//       console.log(err);
//     });

// }

// initMap() {
//   const position = this.position;

//   let latLng = new google.maps.LatLng(position.lat, position.lng);

//   let mapOptions = {
//     center: latLng,
//     zoom: 15,
//     disableDefaultUI: true,
//     clickableIcons: false, 
//   };

//   this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions)
//   this.marker = new google.maps.Marker({
//     map: this.map,
//     animation: google.maps.Animation.DROP,
//     draggable: true,
//   });

//   this.clickHandleEvent();
//   this.infowindows = new google.maps.InfoWindow();
//   this.addMarker(position);
//   this.setInfoWindow(this.marker,this.label.titulo, this.label.subtitulo)

// }

// clickHandleEvent() {
//   this.map.addListener('click', (event: any) => {
//     const position = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };
//     this.addMarker(position);
//   });
// }

// addMarker(position: any): void {
//   let lating = new google.maps.LatLng(position.lat, position.lng);

//   this.marker.setPosition(lating);
//   this.map.panTo(position);
//   this.positionSet = position;
// }

// setInfoWindow(marker: any, titulo: string, subtitulo: any) {
//   const contentString = '<div id ="contentInsideMap>' +
//                         '<div>' +
//                         '</div>' +
//                         '<p style="font-weight: bold; margin-bottom: 5px;"'+ titulo +
//                         '<div id="bodyContent">' +
//                         '<p class="normal m-0">'
//                         + subtitulo + '</p>' +
//                         '</div>'+
//                         '</div>';
//     this.infowindows.setContent(contentString);
//     this.infowindows.open(this.map, marker);
// }

// async mylocation() {
//   console.log('mylocation() click')

//   Geolocation.getCurrentPosition().then((res) => {
//     console.log('mylocation() -> get')

//     const position = {
//       lat: res.coords.latitude,
//       lng: res.coords.longitude,
//     }
//     this.addMarker(position);
//   });

// }
// aceptar(){
//   console.log('click aceptar => ', this.positionSet);
//   this.modalController.dismiss({pos: this.positionSet})
// }

//   async presentAlert() {
//     const alert = await this.alertController.create({
//       header: 'Universitario',
//       subHeader: 'Santiago',
//       message: '$10.000',
//       buttons: [
//         {
//           text: 'Rechazar',
//           cssClass: 'alert-button-cancel',
//         },
//         {
//           text: 'Aceptar',
//           cssClass: 'alert-button-confirm',
//         },
//       ],
//     });

//     await alert.present();
//   }
// }

///////////////////////////////////////////////////////////////////////////////////