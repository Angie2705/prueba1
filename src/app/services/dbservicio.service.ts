import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './rol.service';
import { Comuna } from './comuna.service';
import { Sedes } from './sedes.service';
import { Usuario } from './usuario.service';
import { Calificacion } from './calificacion.service';
import { Viaje } from './viaje.service';
import { Reclamo } from './reclamo.service';
import { Auto } from './auto.service';

@Injectable({
  providedIn: 'root'
})

export class DbservicioService {
  public database!: SQLiteObject;

  //TABLAS CREADAS//  
  tablaRol: string =
    'CREATE TABLE IF NOT EXISTS rol (idrol INTEGER PRIMARY KEY autoincrement NOT NULL, nombrerol VARCHAR (30) NOT NULL);'; //sentencias que es una kuery, crea las tablas

  tablaComuna: string =
    'CREATE TABLE IF NOT EXISTS comuna (idcomuna INTEGER PRIMARY KEY autoincrement NOT NULL, nombreComuna VARCHAR(30)NOT NULL);';

  tablaSedes: string =
    'CREATE TABLE IF NOT EXISTS sede (idSede INTEGER PRIMARY KEY autoincrement NOT NULL, nombreSede VARCHAR(30)NOT NULL);';

  tablaUsuario: string =
    'CREATE TABLE IF NOT EXISTS usuario ( rut VARCHAR(12) PRIMARY KEY , nombre VARCHAR(100) NOT NULL,apellido VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, clave VARCHAR(100) NOT NULL, telefono INTEGER(9) NOT NULL, direccion VARCHAR(50) NOT NULL,idrol_FK INTEGER, FOREIGN KEY (idrol_FK) REFERENCES rol(idrol) );'; // TABLA CON FK INCOMPLETA

  tablaViaje: string =
    'CREATE TABLE IF NOT EXISTS viaje (idViaje INTEGER PRIMARY KEY NOT NULL , fechaViaje DATE NOT NULL, horaViaje DATE NOT NULL, asientos NUMBER(2) NOT NULL, idSede_FK INTEGER, idcomuna_FK INTEGER, descripcion VARCHAR(50) NOT NULL, idCalificacion_FK INTEGER, FOREIGN KEY (idSede_FK) REFERENCES sede(idSede), FOREIGN KEY (idCalificacion_FK) REFERENCES calificacion(idCalificacion), FOREIGN KEY (idcomuna_FK) REFERENCES comuna(idcomuna));';  // TABLA CON FK INCOMPLETA

  tablaCalificacion: string =
    'CREATE TABLE IF NOT EXISTS calificacion (idCalificacion INTEGER PRIMARY KEY autoincrement NOT NULL, comentarioCalificacion VARCHAR(100), calificacion INTEGER(1) NOT NULL );';

  tablaReclamo: string =
    'CREATE TABLE IF NOT EXISTS reclamo (idReclamo INTEGER PRIMARY KEY autoincrement NOT NULL, descripcionReclamo VARCHAR(100) NOT NULL);';

  tablaAuto: string =
    'CREATE TABLE IF NOT EXISTS auto (patente INTEGER PRIMARY KEY autoincrement NOT NULL, color VARCHAR(10) NOT NULL, marca VARCHAR(20) NOT NULL, modelo VARCHAR(20) NOT NULL,  numeroMotor VARCHAR(100) NOT NULL, numeroChasis VARCHAR(100) NOT NULL,rut_FK VARCHAR(12),FOREIGN KEY (rut_FK) REFERENCES usuario(rut)) ;';  // TABLA CON FK INCOMPLETA

  // FIN DE CREACIÓN DE TABLAS //

  // COMIENZO DE LOS INSERT //
  // SE INSERTAN DATOS A LAS TABLAS//
  insertUsuario(rut: string, nombre: string, apellido: string, correo: string, clave: string, telefono: string, direccion: string, PC:string) {
    let NPC=0;
      if (PC == 'Conductor' || PC == 'conductor') {
        NPC = 2
      } else {
        NPC = 1
      }
    const sql = `INSERT INTO usuario (rut, nombre, apellido, correo, clave, telefono, direccion, idrol_FK) VALUES ('${rut}', '${nombre}','${apellido}', '${correo}', '${clave}', '${telefono}','${direccion}',${NPC});`;
    return this.database.executeSql(sql)
  }

  actualizarUsuario(rut:string,nombre:string,apellido:string,email:string,password:string,telefono:string,direccion:string){
    return this.database.executeSql('UPDATE usuario SET nombre = ?, apellido = ?, telefono = ?, direccion = ? WHERE rut = ?',
      [nombre,apellido,telefono,direccion,rut]).then(res=>{
        this.buscarUsuarios();
      }).catch(e=>{
        this.presentAlert("ERROR al actualizar datos de usuario (RUT: "+rut+")");
      })
  }

    // INSERT DE POBLACION DE DATOS //

    insertUsuariotest: string =
    `INSERT OR IGNORE INTO usuario (rut, nombre, apellido, correo, clave, telefono, direccion, idrol_FK) VALUES ('201352886','maximiliano','olave','molave@utem.cl','Gatitos@212',964378329,'arturo rodriguez 2728',1);`;
    // `INSERT INTO usuario (rut, nombre, apellido, correo, clave, telefono, direccion, idrol_FK VALUES (201352886, name, last name, correo@duocuc.cl , password, 964378329, arturo rodriguez 2728,1);`;

  insertRol1: string =
    "INSERT OR IGNORE INTO rol (idrol, nombrerol) VALUES (1, 'Pasajero');";

  insertRol2: string =
    "INSERT OR IGNORE INTO rol (idrol, nombrerol) VALUES (2, 'Conductor');";

  insertComuna: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (1, 'Huechuraba');";

  insertComuna2: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (2, 'Quilicura');";

  insertComuna3: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (3, 'Independencia');";

  insertComuna4: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (4, 'Recoleta');";

  insertComuna5: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (5, 'Conchalí');";


  insertSede: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (1, 'Plaza Norte');";


  insertSede2: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (2, 'Alameda');";

  //FIN DE LOS INSERT//

  //Funciones que retornan los observables
  //RETORNA LOS OBSERVABLES//
  listaRol = new BehaviorSubject([]);
  listaComuna = new BehaviorSubject([]);
  listaSedes = new BehaviorSubject([]);
  listaUsuario = new BehaviorSubject([]);
  listaViaje = new BehaviorSubject([]);
  listaCalificacion = new BehaviorSubject([]);
  listaReclamo = new BehaviorSubject([]);
  listaAuto = new BehaviorSubject([]);

  private isDBREADY: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite, 
    private platform: Platform, 
    private alertController: AlertController
  ) {
    this.crearDB();
  }

  bdState() {
    return this.isDBREADY.asObservable();
  }

  fetchRol(): Observable<Rol[]> {
    return this.listaRol.asObservable();
  }

  fetchComuna(): Observable<Comuna[]> {
    return this.listaComuna.asObservable();
  }

  fetchSedes(): Observable<Sedes[]> {
    return this.listaComuna.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]> {
    return this.listaUsuario.asObservable();
  }

  fetchUsuariodatos(rut: string): Observable<Usuario[]> {
    // const sql = `SELECT * FROM usuario WHERE rut = '${rut}'`;
    const sql = `SELECT * FROM usuario WHERE rut = '201352886'`;
    //OBTENER DATOS//
    return new Observable((observer) => {
      this.database.executeSql(sql)
        .then((data) => {
          if (data.rows.length > 0) {
            const userData = data.rows.item(0);
            observer.next(userData);
            observer.complete();
          } else {
            observer.next();
            observer.complete();
          }
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  fetchCalificacion(): Observable<Calificacion[]> {
    return this.listaCalificacion.asObservable();
  }

  fetchViaje(): Observable<Viaje[]> {
    return this.listaViaje.asObservable();
  }

  fetchReclamo(): Observable<Reclamo[]> {
    return this.listaReclamo.asObservable();
  }
  fetchAuto(): Observable<Auto[]> {
    return this.listaAuto.asObservable();
  }

  buscarAuto() {
    return this.database.executeSql('SELECT * FROM sede', []).then(res => {
      //variable para almacenar el resultado
      let items: Auto[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            patente: res.rows.item(i).patente,
            color: res.rows.item(i).color,
            marca: res.rows.item(i).marca,
            modelo: res.rows.item(i).modelo,
            numeroMotor: res.rows.item(i).numeroMotor,
            numeroChasis: res.rows.item(i).numeroChasis,
            rut_FK: res.rows.item(i).rut_FK,
          });
        }
      }
      //actualizo el observable

      this.listaUsuario.next(items as any);
    });
  }

  buscarCalificacion() {
    return this.database.executeSql('SELECT * FROM sede', []).then(res => {
      //variable para almacenar el resultado
      let items: Calificacion[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idCalificacion: res.rows.item(i).idCalificacion,
            comentarioCalificacion: res.rows.item(i).comentarioCalificacion,
            calificacion : res.rows.item(i).calificacion,
          });
        }
      }
      //actualizo el observable

      this.listaUsuario.next(items as any);
    });
  }

  buscarComuna() {
    return this.database.executeSql('SELECT * FROM sede', []).then(res => {
      //variable para almacenar el resultado
      let items: Comuna[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idcomuna: res.rows.item(i).idcomuna,
            nombreComuna: res.rows.item(i).nombreComuna,
          });
        }
      }
      //actualizo el observable

      this.listaUsuario.next(items as any);
    });
  }

  buscarReclamo() {
    return this.database.executeSql('SELECT * FROM sede', []).then(res => {
      //variable para almacenar el resultado
      let items: Reclamo[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idReclamo: res.rows.item(i).idReclamo,
            descripcionReclamo: res.rows.item(i).descripcionReclamo,
          });
        }
      }
      //actualizo el observable

      this.listaUsuario.next(items as any);
    });
  }

  buscarRol() {
    return this.database.executeSql('SELECT * FROM sede', []).then(res => {
      //variable para almacenar el resultado
      let items: Rol[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idrol: res.rows.item(i).idrol,
            nombrerol: res.rows.item(i).nombrerol,
          });
        }
      }
      //actualizo el observable

      this.listaUsuario.next(items as any);
    });
  }

  buscarSedes() {
    return this.database.executeSql('SELECT * FROM sede', []).then(res => {
      //variable para almacenar el resultado
      let items: Sedes[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idSede: res.rows.item(i).idSede,
            nombreSede: res.rows.item(i).nombreSede,
          });
        }
      }
      //actualizo el observable

      this.listaSedes.next(items as any);
    });
  }
  

  buscarViaje() {
    return this.database.executeSql('SELECT * FROM sede', []).then(res => {
      //variable para almacenar el resultado
      let items: Viaje[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idViaje: res.rows.item(i).idViaje,
            fechaViaje: res.rows.item(i).fechaViaje,
            horaViaje: res.rows.item(i).horaViaje,
            asientos: res.rows.item(i).asientos,
            idSede_FK: res.rows.item(i).idSede_FK,
            idcomuna_FK: res.rows.item(i).idcomuna_FK,
            descipcion: res.rows.item(i).descipcion,
            idCalificacion_FK: res.rows.item(i).idCalificacion_FK,
          });
        }
      }
      //actualizo el observable

      this.listaUsuario.next(items as any);
    });
  }

  buscarUsuarios() {
    return this.database.executeSql('SELECT * FROM sede', []).then(res => {
      //variable para almacenar el resultado
      let items: Usuario[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            rut: res.rows.item(i).rut_u,
            nombre: res.rows.item(i).nombre_u,
            apellido: res.rows.item(i).apellido_u,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            telefono: res.rows.item(i).telefono_u,
            direccion: res.rows.item(i).direccion_u,
            idrol_FK: res.rows.item(i).idrol_FK_u,
          });
        }
      }
      //actualizo el observable

      this.listaUsuario.next(items as any);
    });
  }

  buscarUsuario(rut:string){
    return this.database.executeSql('SELECT * FROM usuario WHERE rut = ?',[rut]).then(res=>{
      if(res.rows.length == 1){
        return res.rows.item(0);
      }
    })
  }

  buscarUsuarioCorreo(correo:string){
    return this.database.executeSql('SELECT * FROM usuario WHERE correo = ?',[correo]).then(res=>{
      if(res.rows.length == 1){
        return res.rows.item(0);
      }
    })
  }
  

  login(correo: any, password: any) {
    //this.storage.set('logeado', correo)

    let log = [correo, password]
    return this.database.executeSql("SELECT * FROM usuario WHERE correo = ? AND clave = ?", [log[0], log[1]])
      .then(res => {
        let items: Usuario[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              rut: res.rows.item(i).rut,
              nombre: res.rows.item(i).nombre,
              apellido: res.rows.item(i).apellido,
              correo: res.rows.item(i).correo,
              clave: res.rows.item(i).clave,
              telefono: res.rows.item(i).telefono,
              direccion: res.rows.item(i).direccion,
              idrol_FK: res.rows.item(i).idrol_FK,
            });
          }
          return true;
        }
        else {
          return false;
        }
      })
  }

  //Fin Funciones que retornan los observables
  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }


  // bdState() {
  //   return this.isDBREADY.asObservable();
  // }

  
  crearDB() {
    // verificar el platform
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'bdsali(1).db',
        location: 'default',
      })
        .then((db: SQLiteObject) => {
          //capturar la coneccion a BD
          this.database = db;

          // ejecuto la creación de tablas
          this.crearTablas();
        }).catch(e => {
          this.presentAlert("Error en crearBD: " + e);
        })
    })

  }

  async crearTablas() {
    let state = 0;
    try {
      // ejecutar la creación de tablas
      await this.database.executeSql(this.tablaRol, []);state = 1;
      await this.database.executeSql(this.tablaComuna, []);state = 2;
      await this.database.executeSql(this.tablaSedes, []);state = 3;
      await this.database.executeSql(this.tablaUsuario, []);state = 4;
      await this.database.executeSql(this.tablaViaje, []);state = 5;
      await this.database.executeSql(this.tablaCalificacion, []);state = 6;
      await this.database.executeSql(this.tablaReclamo, []);state = 7;
      await this.database.executeSql(this.tablaAuto, []);state = 8;

      //ejecuto los insert
      await this.database.executeSql(this.insertRol1, []);state = 9;
      await this.database.executeSql(this.insertRol2, []);state = 10;
      await this.database.executeSql(this.insertComuna, []);state = 11;
      await this.database.executeSql(this.insertComuna2, []);state = 12;
      await this.database.executeSql(this.insertUsuariotest, []);state = 13;
      console.log('Tabla de usuario creada exitosamente');
      await this.database.executeSql(this.insertComuna3, []);state = 14;
      await this.database.executeSql(this.insertComuna4, []);state = 15;
      await this.database.executeSql(this.insertComuna5, []);state = 16;
      await this.database.executeSql(this.insertSede, []);state = 17;
      await this.database.executeSql(this.insertSede2, []);state = 18;

      //cambio mi observable de BD
      this.isDBREADY.next(true);
      //this.buscarSedes();
    } catch (e) {
      this.presentAlert('Error en crearTablas: ' + JSON.stringify(e) + "[S"+state+"]");
    }
  }
}
