import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  onlyStudents = [
    {name: 'Amilcar1'},
    {name: 'Amilcar2'},
    {name: 'Amilcar3'},
    {name: 'Amilcar4'},
    {name: 'Amilcar5'},
    {name: 'Amilcar6'}
  ]

  

  schedules: Array<any> = [
    {schedule:'Jueves 30 Sep, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]},
    {schedule:'Jueves 7 Oct, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]},
    {schedule:'Jueves 14 Oct, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]},
    {schedule:'Jueves 21 Oct, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]},
    {schedule:'Jueves 28 Oct, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]},
    {schedule:'Jueves 4 Nov, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]},
    {schedule:'Jueves 11 Nov, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]},
    {schedule:'Jueves 18 Nov, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]},
    {schedule:'Jueves 25 Nov, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]},
    {schedule:'Jueves 2 Dic, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]},
    {schedule:'Jueves 9 Dic, 2021, 07:00-07:30',listStudents:[
      {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar1',attendance:'Presente',grade:'100'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar2',attendance:'Tarde',grade:'50'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar3',attendance:'Inasistencia',grade:'80'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar4',attendance:'Presente',grade:'75'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'},
    {name: 'Amilcar5',attendance:'Presente',grade:'100'}
    ]}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  
}
