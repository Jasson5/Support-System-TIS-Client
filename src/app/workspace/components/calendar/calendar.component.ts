import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Calendar } from 'src/app/models/calendar';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() public data: any;
  public calendarEditorForm: FormGroup;
  public calendarToEdit: Calendar;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private calendarService: CalendarService) { }

  //Llama a los metodos respectivos
  ngOnInit(): void {
    console.log(this.data);
    this.buildForm();
    this.buildFormToEdit();
  }

  //Inicializa el formulario de anotaciones
  buildForm() {
    this.calendarEditorForm = this.formBuilder.group({
      description: [''],
      observation: ['']
    });
  }

  //Obtiene las ultimas anotaciones guardadas anteriormente
  private buildFormToEdit() {
    this.calendarService.listCaledar(this.data.companyName, this.data.date).subscribe(calendar => {
      this.calendarToEdit = calendar;
      this.calendarEditorForm.patchValue({
        observation: this.calendarToEdit.dayObservation,
        description: this.calendarToEdit.dayDescription
      });
    });
  }

  //Guarda los cambios de las anotaciones
  saveChanges(){
    var calendar = this.calendarEditorForm.value;
    this.calendarService.updateCalendar(this.calendarToEdit,calendar).subscribe(()=>{
      alert("los datos se guardaron correctamente")
    });
  }
  
  //Obtiene el campo de Lo que se reviso
  get description() {
    return this.calendarEditorForm.get('description');
  }

  //Obtiene el campo de Lo que se revisara
  get observation() {
    return this.calendarEditorForm.get('observation');
  }
}
