import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { ServicesComponent } from '../services/services.component';
import { Router } from '@angular/router';
import { Institut } from '../model/institut.model';
import { AbstractControl, FormBuilder, FormGroup, FormGroupName, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styleUrl: './add-etudiant.component.css'
})
export class AddEtudiantComponent implements OnInit {
  newEtudiant =new Etudiant();
  institut! : Institut[];
  newNom! : string;
  newInstitut! : Institut;
  myForm! :FormGroup;


  constructor(private serviceComponent :ServicesComponent,private router:Router,private formBuilder :FormBuilder){

  }

  ngOnInit(): void {
    this.institut =this.serviceComponent.listeInstituts();
    this.myForm = this.formBuilder.group({

      nom : ['', [Validators.required,Validators.minLength(3)]],
      prenom :['', [Validators.required, Validators.minLength(3)]],
      cin :['', [Validators.required, this.cinLengthValidator()]],
      dateNaissance :['', [Validators.required]],
      classe :['', [Validators.required]],
      institut :['', [Validators.required]],

      email : ['', [Validators.required, Validators.email]],
      } );
    
    }
  
    cinLengthValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value !== null && value !== undefined && value.toString().length !== 8) {
          return { 'cinLength': true }; // Retourne une erreur si la longueur n'est pas de 8
        }
        return null; // Pas d'erreur
      };
    }
    
  addEtudiant(){
    this.newInstitut =this.serviceComponent.consulterInstitut(this.newNom);
    this.newEtudiant.institut = this.newInstitut;

    this.serviceComponent.ajouterEtudiant(this.newEtudiant);
    this.router.navigate(["etudiant"]);
    
    
  }
}
