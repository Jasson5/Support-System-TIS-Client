import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementService } from 'src/app/announcement/services/announcement.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Announcement } from 'src/app/models/announcement';
import { HomeInformarion } from 'src/app/models/home-information';
import { Offer } from 'src/app/models/offer';
import { Semester } from 'src/app/models/semester';
import { OfferService } from 'src/app/offer/services/offer.service';
import { SemesterService } from 'src/app/semester/services/semester.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public viewButonForOptions = true;
  public viewOptions = false;
  public viewAnnouncements = false;
  public viewAdvertisements = false;
  public AdvertisementsStatus;
  public AnnouncementsStatus;
  public offers: Offer[] = [];
  public announcements: Announcement[] = [];
  public homeInformarions: HomeInformarion[] = [];
  public autor;
  public semesterNames;
  public semester: Semester;


  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private announcementService: AnnouncementService,
    private semesterService: SemesterService,
    private offerService: OfferService
  ) { }


  ngOnInit(): void {
    //Se habilita la opcion de anunciar algo con la clase para el usuario administrador
    this.viewButonForOptions = this.auth.getRoles().includes('Admin');
    this.autor = this.auth.getUsername();
    //Muestra el spinner mientras obtiene la informacion de publicaciones del semestre seleccionado
    this.route.params.subscribe(params => {
      this.spinner.show();
      this.semesterService.FindSemesterByCode(params.code).subscribe(semester=>{
        this.semesterNames = semester.name;
      });
      this.listHomeInformation(params.code);

    });
  }

  //Se abre una nueva pestaña para visualizar el archivo subido
  goToLink(url: string) {
    window.open(url, "_blank");
  }

  //Recupera la informacion de las convocatorias y de los anuncios publicados
  listHomeInformation(code) {
    this.spinner.show();
    this.offerService.listOffers(code).subscribe(offers => {
      offers.forEach(o => {
        var homeInformarion = new HomeInformarion();
        homeInformarion.statusId = 1;
        homeInformarion.id = o.id;
        homeInformarion.dateCreated = o.dateCreation;
        homeInformarion.dateEnd = o.dateEnd;
        homeInformarion.description = o.description;
        homeInformarion.documentUrl = o.documentOfferUrl;
        homeInformarion.minUsers = o.minUsers;
        homeInformarion.maxUsers = o.maxUsers;
        this.homeInformarions.push(homeInformarion);
      });
      this.announcementService.listAnnouncements(code).subscribe(announcements => {
        announcements.forEach(a => {
          var homeInformarion = new HomeInformarion();
          homeInformarion.statusId = 2;
          homeInformarion.dateCreated = a.dateCreation;
          homeInformarion.description = a.description;
          homeInformarion.documentUrl = a.documentUrl;
          this.homeInformarions.push(homeInformarion);
        })
        this.homeInformarions= this.homeInformarions.sort((a,b) => a.dateCreated.toString().localeCompare(b.dateCreated.toString())).reverse();
        this.spinner.hide();
      });
    });
  }

  //Verifica el estado de la variable para mostrar u ocultar la vista de opciones de publicacion
  changeViewOptions() {
    if (this.viewOptions == false) {
      this.viewOptions = true;
      this.viewButonForOptions = false;
    } else {
      this.viewOptions = false;
      this.viewButonForOptions = true;
    }
  }

  //Obtiene el estado de las opciones seleccionadas, ya sea una convocatoria o un anuncio
  onItemChange(viewAnnouncementsStatus, viewAdvertisementsStatus) {
    this.AnnouncementsStatus = viewAnnouncementsStatus;
    this.AdvertisementsStatus = viewAdvertisementsStatus;
  }

  //Verifica el estado de las variables para mostrar u ocultar el formulario de las convocatorias oo anuncios
  changeViewAnnouncementssOrAdvertisements() {
    if (this.AnnouncementsStatus == true) {
      this.viewAnnouncements = true;
      this.viewOptions = false;
      this.viewButonForOptions = false;
    }
    if (this.AdvertisementsStatus == true) {
      this.viewAdvertisements = true;
      this.viewOptions = false;
      this.viewButonForOptions = false;
    }
  }

  //Actualiza los valores de variables que nos ayudan a cambiar la vista de conovocatorias
  cancelAnnouncement() {
    this.viewAnnouncements = false;
    this.viewOptions = true;
  }

  //Actualiza los valores de variables que nos ayudan a cambiar la vista de anuncios
  cancelAdvertisement() {
    this.viewAdvertisements = false;
    this.viewOptions = true;
  }
}
