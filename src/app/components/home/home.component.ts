import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';import { AnnouncementService } from 'src/app/announcement/services/announcement.service';
 import { Announcement } from 'src/app/models/announcement';
import { Offer } from 'src/app/models/offer';
import { UploadService } from 'src/app/services/upload.service';
;


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
  public announcementEditorForm: FormGroup;
  public folderName: string = "announcements";
  public thumbnail = null;
  public thumbnailData = null;
  public imageErrorSize = null;
  public file;
  private FILE_MAX_SIZE = 50000000;
  public pannouncementToEdit: Announcement;
  public offers: Offer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private uploadService: UploadService,
    private spinner: NgxSpinnerService,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit(): void {
    this.announcementService.listOffers().subscribe(offers => {
      this.offers = offers;
    });
  }
  
  goToLink(url: string){
    window.open(url, "_blank");
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
