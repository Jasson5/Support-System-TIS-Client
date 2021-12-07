import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Offer } from 'src/app/models/offer';
import { CompressImageService } from 'src/app/services/compress/compress-image.service';
import { UploadService } from 'src/app/services/upload.service';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {

  public offerEditorForm: FormGroup;
  public folderName: string = "offer";
  public thumbnail = null;
  public thumbnailData = null;
  public imageErrorSize = null;
  public file;
  private FILE_MAX_SIZE = 50000000;
  public offerToEdit: Offer;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private calendar: NgbCalendar,
    private uploadService: UploadService,
    private compressImage: CompressImageService,
    private spinner: NgxSpinnerService,
    private offerService: OfferService
  ) {
  }

  ngOnInit(): void {
    this.buildFormOffer();
  }

  buildFormOffer() {
    this.offerEditorForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(500)]],
      dateEnd: [this.calendar.getToday(), [Validators.required]],
      file: null,
      minUsers: [, [Validators.required]],
      maxUsers: [, [Validators.required]]
    });
  }

  AddOffer() {
    var offer = this.offerEditorForm.value;
    var component = this;

    this.uploadService.uploadFile(this.file, this.folderName)
      .then(function (data) {
        offer.thumbnailUrl = data.Location;
        component.sendOfferData(offer);
      })
      .catch(function (error) {
        console.log('There was an error uploading your file: ', error);
        component.spinner.hide();
      });
  }

  sendOfferData(offer) {
    offer.dateEnd = new Date(offer.dateEnd.year, offer.dateEnd.month - 1, offer.dateEnd.day);
    this.offerService.addOffer(offer).subscribe(()=>{
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
          this.offerEditorForm.controls['file'].setErrors({ incorrect: true });
        } else {
          this.imageErrorSize = null;
          this.thumbnailData = event.target.result;
          // need to run CD since file load runs outside of zone
          this.offerEditorForm.controls['file'].reset();
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
    return this.offerEditorForm.get('description');
  }

  get dateEnd() {
    return this.offerEditorForm.get('dateEnd');
  }

  get minUsers() {
    return this.offerEditorForm.get('minUsers');
  }

  get maxUsers() {
    return this.offerEditorForm.get('maxUsers');
  }

}
