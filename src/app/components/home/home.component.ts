import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';;


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
  public companEditorForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.buildFormAnnouncement();
  }
  
  buildFormAnnouncement() {
    this.companEditorForm = this.formBuilder.group({
      titleAnnouncement: ['', [Validators.required, Validators.maxLength(50)]],
      descriptionAnnouncement: ['', [Validators.required, Validators.maxLength(500)]],
      filesAnnouncement:['',[Validators.required]],
      minPartnerAnnouncement:['',[Validators.required]],
      maxPartnerAnnouncement:['',[Validators.required]]
    });
  }
  get titleAnnouncement() {
    return this.companEditorForm.get('titleAnnouncement');
  }
 
  get descriptionAnnouncement() {
    return this.companEditorForm.get('descriptionAnnouncement');
  }
  get filesAnnouncement() {
    return this.companEditorForm.get('filesAnnouncement');
  }
  get minPartnerAnnouncement() {
    return this.companEditorForm.get('minPartnerAnnouncement');
  }
  get maxPartnerAnnouncement() {
    return this.companEditorForm.get('maxPartnerAnnouncement');
  }

  changeViewOptions(){
    if(this.viewOptions == false){
      this.viewOptions = true;
      this.viewButonForOptions = false;
    }else{
      this.viewOptions = false;
      this.viewButonForOptions = true;
    }
  }

  onItemChange(viewAnnouncementsStatus, viewAdvertisementsStatus){
    this.AnnouncementsStatus = viewAnnouncementsStatus;
    this.AdvertisementsStatus = viewAdvertisementsStatus;    
  }

  changeViewAnnouncementssOrAdvertisements(){
    if(this.AnnouncementsStatus == true){
      this.viewAnnouncements = true;
      this.viewOptions = false;
      this.viewButonForOptions = false;
    }
    if(this.AdvertisementsStatus == true){
      this.viewAdvertisements = true;
      this.viewOptions = false;
      this.viewButonForOptions = false;
    }
  }
  
  cancelAnnouncement(){    
    this.viewAnnouncements = false;
    this.viewOptions = true;
  }
  
  cancelAdvertisement(){    
    this.viewAdvertisements = false;
    this.viewOptions = true;
  }
}
