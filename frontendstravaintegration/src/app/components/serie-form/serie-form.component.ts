import {Component} from '@angular/core';
import {FormArray, Validators, FormGroup, FormControl, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {InternalService} from "../../services/internal.service";
import {BackendStravaService} from "../../services/backend-strava.service";
import {StateSerie} from "../../interfaces/enum/state-serie";
import {translationsTypeSerie, TypeSerie} from "../../interfaces/enum/type-serie";
import {NgForOf, NgIf} from "@angular/common";
import {ErrorFormComponent} from "../error-form/error-form.component";

@Component({
  standalone: true,
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: ['./serie-form.component.scss'],
  imports: [ReactiveFormsModule, NgForOf, NgIf],
})
export class SerieFormComponent {

  seriesTypes = Object.values(TypeSerie);
  translationsSeriesTypes = translationsTypeSerie
  seriesState = Object.values(StateSerie);

  serieForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    create_timestamp: [undefined],
    state: [StateSerie.active],
    type: [TypeSerie.Itinerancy, Validators.required],
    athleteId: [undefined],
    bio: ['', Validators.maxLength(1000)],
    // address: this.formBuilder.group({
    //   type: [''],
    //   city: [''],
    //   state: [''],
    //   zip: [''],
    // }),
  });

  errorsSerieForm = {
    name_required: {state: false, warning: ['A name is required for create a serie', 'Un nom est nécessaire pour créer la série']},
    name_max_length: {state: false, warning: ['A name of a serie is maximum of 100 characters', 'Un nom de série est au maximum 100 charactères']},
    bio_max_length: {state: false, warning: ['A bio of a serie is maximum of 1000 characters', 'Un biographie de série est au maximum 1000 charactères']},
  }

  constructor(protected internalService: InternalService, private backend: BackendStravaService, private formBuilder: FormBuilder) {}

   ngOnInit(){
    this.checkValidityForm(this.serieForm.status)
     if(this.serieForm.value.type!=undefined) this.updateType(this.serieForm.value.type)
      this.serieForm.statusChanges.subscribe((status) => this.checkValidityForm(status));
   }

  checkValidityForm(status: string){
      const nameErrors = this.serieForm.get('name')?.errors;
      const bioErrors = this.serieForm.get('bio')?.errors;

      this.errorsSerieForm.name_required.state = nameErrors!=null && ('required' in nameErrors) ? true : false
      this.errorsSerieForm.name_max_length.state = nameErrors!=null && ('maxlength' in nameErrors) ? true : false
      this.errorsSerieForm.bio_max_length.state = bioErrors!=null && ('maxlength' in bioErrors) ? true : false
  }

  updateType(type: string){
    console.log("Update type to ",type)
    // console.log(document.getElementsByClassName('label-radio'))
    // console.log(document.getElementById(type))
    // let htmlCollectction = document.getElementsByClassName('label-radio')
    // document.getElementsByClassName('label-radio').item(0)
    // document.querySelectorAll('label').forEach((input) =>{
    //     console.log('yes not')
    //     if(input.id==type){
    //       console.log('yes one')
    //     }
    //   }
    // )
  }

  onSubmit() {
    if(this.serieForm.valid){
      console.log('form valid')
      console.log('serieForm ', this.serieForm.value)
      // const serieToCreate: Serie = this.serieForm.value
      // console.log('serieToCreate: ', serieToCreate)
      // call backend save blabla
    }
    else{
      console.log("form invalid")
    }
  }
}
