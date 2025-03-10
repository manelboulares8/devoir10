import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { ServicesComponent } from '../services/services.component';
import { SearchFilterPipe } from '../search-filter.pipe';
@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrl: './recherche-par-nom.component.css'
})
export class RechercheParNomComponent implements OnInit {
  allEtudiants! : Etudiant[];
  searchTerm!: string;
  etudiant! :Etudiant[];
  constructor(private serviceComponent : ServicesComponent){

  }
  ngOnInit(): void {
  /*   this.serviceComponent.listeEtudiant().subscribe(etu => {
      console.log(etu);
      this.allEtudiants = etu;
      });
      */
    //  this.etudiant=this.serviceComponent.listeEtudiant() ;
      this.allEtudiants=this.etudiant;
  }
 
  onKeyUp(filterText : string){
    this.etudiant = this.allEtudiants.filter(item =>item.nom!.toLowerCase().includes(filterText.toLowerCase()));
 
}
}