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

  ngOnInit(): void {
    console.log(this.data);
    this.buildForm();
    this.buildFormToEdit();
  }

  buildForm() {
    this.calendarEditorForm = this.formBuilder.group({
      description: [''],
      observation: ['']
    });
  }

  private buildFormToEdit() {
    this.calendarService.listCaledar(this.data.companyName, this.data.date).subscribe(calendar => {
      this.calendarToEdit = calendar;
      this.calendarEditorForm.patchValue({
        observation: this.calendarToEdit.dayObservation,
        description: this.calendarToEdit.dayDescription
      });
    });
  }

  saveChanges(){
    var calendar = this.calendarEditorForm.value;
    this.calendarService.updateCalendar(this.calendarToEdit,calendar).subscribe(()=>{
      alert("los datos se guardaron correctamente")
    });
  }
  
  get description() {
    return this.calendarEditorForm.get('description');
  }
  
  get observation() {
    return this.calendarEditorForm.get('observation');
  }
}
