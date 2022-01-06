import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Offer } from 'src/app/models/offer';
import { SemesterService } from 'src/app/semester/services/semester.service';
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
  public semesterCode;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private calendar: NgbCalendar,
    private uploadService: UploadService,
    private compressImage: CompressImageService,
    private semesterService: SemesterService,
    private spinner: NgxSpinnerService,
    private offerService: OfferService
  ) {
  }

  //Obtiene la gestion e inicializa el formulario
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.semesterCode = params.code
    });
    this.buildFormOffer();
  }

  //Inicializa el formulario de la convocatoria con sus respectivas validaciones
  buildFormOffer() {
    this.offerEditorForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(500)]],
      dateEnd: [this.calendar.getToday(), [Validators.required]],
      file: null,
      minUsers: [, [Validators.required]],
      maxUsers: [, [Validators.required]]
    });
  }

  //Segun la cantidad de miembros, guarda en una variable los datos
  AddOffer() {
    var offer = this.offerEditorForm.value;
    if(offer.minUsers <= offer.maxUsers) {
      this.spinner.show();
      var component = this;
      this.uploadService.uploadFile(this.file, this.folderName)
        .then(function (data) {
          offer.thumbnailUrl = data.Location;
          component.sendOfferData(offer);
        })
        .catch(function (error) {
          console.log('There was an error uploading your file: ', error);
          this.spinner.hide();
        });
    }else{
      alert("El minimo de miembros no puede ser mayor al maximo de miembros");
    }    
  }

  //Añade la convocatoria a la base de datos
  sendOfferData(offer) {
    this.semesterService.FindSemesterByCode(this.semesterCode).subscribe(semester => {
      offer.dateEnd = new Date(offer.dateEnd.year, offer.dateEnd.month - 1, offer.dateEnd.day);
      this.offerService.addOffer(offer, semester).subscribe(() => {
        this.spinner.hide();
        location.reload();
      });
    });
  }

  //Recarga la vista
  cancel() {
    location.reload();
  }


  //Se permite cambiar el archivo subido
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
          // Necesita ejecutar el CD ya que la carga del archivo se ejecuta fuera de la zona
          this.offerEditorForm.controls['file'].reset();
          this.cd.markForCheck();
        }
      }
    }
  }

  //Remueve el archivo subido
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
