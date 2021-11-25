import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';
import { Announcement } from 'src/app/models/announcement';
import { CompressImageService } from 'src/app/services/compress/compress-image.service';
import { UploadService } from 'src/app/services/upload.service';
import { AnnouncementService } from '../services/announcement.service';

@Component({
  selector: 'app-announcement-editor',
  templateUrl: './announcement-editor.component.html',
  styleUrls: ['./announcement-editor.component.scss']
})
export class AnnouncementEditorComponent implements OnInit {

  public announcementEditorForm: FormGroup;
  public folderName: string = "announcements";
  public thumbnail = null;
  public thumbnailData = null;
  public imageErrorSize = null;
  public file;
  private FILE_MAX_SIZE = 50000000;
  public pannouncementToEdit: Announcement;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private calendar: NgbCalendar,
    private uploadService: UploadService,
    private compressImage: CompressImageService,
    private spinner: NgxSpinnerService,
    private announcementService: AnnouncementService
  ) {
  }

  ngOnInit(): void {
    this.buildFormAnnouncement();
  }

  buildFormAnnouncement() {
    this.announcementEditorForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(500)]],
      dateOffer: [this.calendar.getToday(), [Validators.required]],
      file: null,
      minPartner: ['', [Validators.required]],
      maxPartner: ['', [Validators.required]]
    });
  }

  AddAnnouncement() {
    var announcement = this.announcementEditorForm.value;
    var component = this;

    this.uploadService.uploadFile(this.file, this.folderName)
      .then(function (data) {
        announcement.thumbnailUrl = data.Location;
        component.sendAnnouncementData(announcement);
      })
      .catch(function (error) {
        console.log('There was an error uploading your file: ', error);
        component.spinner.hide();
      });
  }

  sendAnnouncementData(announcement) {
    announcement.dateOffer = new Date(announcement.dateOffer.year, announcement.dateOffer.month - 1, announcement.dateOffer.day);
    this.announcementService.addOffer(announcement).subscribe(()=>{
    });
  }

  cancel(){
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      [this.file] = event.target.files;
      const fileSize = this.file.size;
      reader.readAsDataURL(this.file);

      reader.onload = (event: any) => {
        if (fileSize > this.FILE_MAX_SIZE) {
          this.thumbnailData = null;
          this.file = null;
          this.imageErrorSize = "La imagen no puede exceder el tamaño de 1 MB";
          this.announcementEditorForm.controls['file'].setErrors({ incorrect: true });
        } else {
          this.imageErrorSize = null;
          this.thumbnailData = event.target.result;
          // need to run CD since file load runs outside of zone
          this.announcementEditorForm.controls['file'].reset();
          this.cd.markForCheck();
        }
      }
    }
  }

  removeFile() {
    this.file = null;
    this.thumbnailData = null;
  }

  get description() {
    return this.announcementEditorForm.get('description');
  }

  get dateOffer() {
    return this.announcementEditorForm.get('dateOffer');
  }

  get minPartner() {
    return this.announcementEditorForm.get('minPartner');
  }

  get maxPartner() {
    return this.announcementEditorForm.get('maxPartner');
  }
}
