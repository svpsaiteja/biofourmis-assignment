import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  formSubmitted = false;
  showPopup = false;
  medicationControl = new FormControl('');


  patientForm = this.fb.group({
    patientID: ['', Validators.required],
    password: ['', Validators.required],
    age: ['', Validators.required],
    height: ['', Validators.required],
    heightUnit: ['', Validators.required],
    weight: ['', Validators.required],
    weightUnit: ['', Validators.required],
    gender: ['', Validators.required],
    country: ['', Validators.required],
    medications: this.fb.array([])
  });


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.medicationControl.valueChanges
    .pipe(tap(val => !val ? this.medicationsFormArrayControls.length = 0 : this.addMedication()))
    .subscribe();

  }

  initPatientForm() {
    this.patientForm = this.fb.group({
      patientID: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required],
      height: ['', Validators.required],
      heightUnit: ['', Validators.required],
      weight: ['', Validators.required],
      weightUnit: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      medications: this.fb.array([])
    });
  }
  
  addMedication() {
    this.medicationsFormArray.push(this.medicationForm);
  }

  deleteMedication(index: number) {
    this.medicationsFormArray.removeAt(index);
  }

  get medicationsFormArray() {
    return (this.patientForm.get('medications') as FormArray);
  }

  get medicationsFormArrayControls() {
    return (this.patientForm.get('medications') as FormArray).controls
  }

  get medicationForm() {
    return this.fb.group({
      medicationType: ['', Validators.required],
      medicationName: ['', Validators.required],
      medicationDosage: ['', Validators.required],
      medicationUnit: ['', Validators.required],
      medicationCount: [''],
      specifications: ['']
    });
  }

  get medicationValue(): boolean {
    return this.medicationControl.value;
  }



  save() {
    this.formSubmitted = true;
    
    if(this.patientForm.invalid) return;
    
    this.showPopup = true;
  }
  
  cancel() {
   this.initPatientForm();
    this.formSubmitted = false;
  }
}
