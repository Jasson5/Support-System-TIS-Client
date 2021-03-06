import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';
import { Announcement } from 'src/app/models/announcement';
import { SemesterService } from 'src/app/semester/services/semester.service';
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
  public semesterCode;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private calendar: NgbCalendar,
    private uploadService: UploadService,
    private compressImage: CompressImageService,
    private spinner: NgxSpinnerService,
    private semesterService: SemesterService,
    private announcementService: AnnouncementService
  ) {
  }

  //Obtiene le codigo de semestre
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.semesterCode = params.code
    });
    this.buildFormAnnouncement();
  }

  //Inicializa el formulario de un anuncio con sus respectivas validaciones
  buildFormAnnouncement() {
    this.announcementEditorForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(500)]],
      file: null,
    });
  }

  //Obtiene los datos de un anuncio en una variable
  AddAnnouncement() {
    this.spinner.show();
    var announcement = this.announcementEditorForm.value;
    var component = this;

    //En caso de que se haya subido un archivo
    if (this.file != undefined) {
      this.uploadService.uploadFile(this.file, this.folderName)
        .then(function (data) {
          announcement.thumbnailUrl = data.Location;
          component.sendAnnouncementData(announcement);
        })
        .catch(function (error) {
          console.log('There was an error uploading your file: ', error);
          component.spinner.hide();
        });
    //En caso de que no se haya subido un archivo
    }else{
      this.sendAnnouncementData(announcement);
    }
  }

  //Envia el anuncio a la base de datos
  sendAnnouncementData(announcement) {
    this.semesterService.FindSemesterByCode(this.semesterCode).subscribe(semester => {
      announcement.semester = semester;
      this.announcementService.addAnnouncement(announcement).subscribe(() => {
        this.spinner.hide();
        location.reload();
      });
    });
  }

  //Recarga la pagina
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
          this.imageErrorSize = "La imagen no puede exceder el tama??o de 1 MB";
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

  //Elimina un archivo subido
  removeFile() {
    this.file = null;
    this.thumbnailData = null;
  }

  //Obtiene la descripcion del anuncio
  get description() {
    return this.announcementEditorForm.get('description');

  }
}
