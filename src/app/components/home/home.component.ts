import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnnouncementService } from 'src/app/announcement/services/announcement.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Announcement } from 'src/app/models/announcement';
import { HomeInformarion } from 'src/app/models/home-information';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/offer/services/offer.service';

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

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private announcementService: AnnouncementService,
    private offerService: OfferService
  ) { }

  ngOnInit(): void {
    this.viewButonForOptions = this.auth.getRoles().includes('Admin');
    this.autor = this.auth.getUsername();
    this.route.params.subscribe(params => {
      this.spinner.show();
      this.listHomeInformation(params.code);
    });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

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

  changeViewOptions() {
    if (this.viewOptions == false) {
      this.viewOptions = true;
      this.viewButonForOptions = false;
    } else {
      this.viewOptions = false;
      this.viewButonForOptions = true;
    }
  }

  onItemChange(viewAnnouncementsStatus, viewAdvertisementsStatus) {
    this.AnnouncementsStatus = viewAnnouncementsStatus;
    this.AdvertisementsStatus = viewAdvertisementsStatus;
  }

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

  cancelAnnouncement() {
    this.viewAnnouncements = false;
    this.viewOptions = true;
  }

  cancelAdvertisement() {
    this.viewAdvertisements = false;
    this.viewOptions = true;
  }
}
