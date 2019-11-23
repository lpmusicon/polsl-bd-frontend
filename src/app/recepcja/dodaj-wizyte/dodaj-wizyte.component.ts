import { Component, OnInit } from '@angular/core';
import { DodajPacjentaComponent } from '../dodaj-pacjenta/dodaj-pacjenta.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';


export interface Doctor {
  value: string;
  viewValue: string;
}

export interface Patient {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dodaj-wizyte',
  templateUrl: './dodaj-wizyte.component.html',
  styleUrls: ['./dodaj-wizyte.component.scss']
})
export class DodajWizyteComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    if(params["patient"]) {
      console.log("Patient: ", params["patient"]);
    }
    console.log("Par: ", params);
  }) }

  ngOnInit() {
  }

  openAddPatientDialog(): void {
    const openAddpatientDialogRef = this.dialog.open(DodajPacjentaComponent, {
      width: '650px',
    });

    openAddpatientDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  doctors: Doctor[] = [
    { value: 'doc-1', viewValue: 'Jaracz' },
    { value: 'doc-2', viewValue: 'Zjadacz' },
    { value: 'doc-3', viewValue: 'Podpalacz' },
    { value: 'doc-4', viewValue: 'Laborant' },
    { value: 'doc-5', viewValue: 'Kierownik Laboratorium' }
  ];

  patients: Patient[] = [
    { value: 'pat-1', viewValue: 'Jaracz' },
    { value: 'pat-2', viewValue: 'Zjadacz' },
    { value: 'pat-3', viewValue: 'Podpalacz' },
    { value: 'pat-4', viewValue: 'Laborant' },
    { value: 'pat-5', viewValue: 'Kierownik Laboratorium' }
  ];

  public filteredList1 = this.patients.slice();
  public filteredList2 = this.doctors.slice();

}
