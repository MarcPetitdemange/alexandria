import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { stringLength } from '@firebase/util';
import { IonModal } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss'],
})
export class AddCategorieComponent implements OnInit {

  @Output() refresh = new EventEmitter<any>();

  @ViewChild(IonModal) modalCategory!: IonModal;

  @Input() public category: FormGroup;

  isOpen = false;

  editMode = false;

  constructor( private categoriesService: CategoriesService) {
    this.category = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {

  }

  cancel(){
    this.modalCategory.dismiss();
    this.cleanForm();
  }

  submit(){
    if(this.editMode) {
      this.categoriesService.editCategorie(this.category.value).then(value => {
        this.modalCategory.dismiss();
        this.cleanForm();
        this.refresh.emit();
      });
    } else {
      this.categoriesService.addCategory(this.category.value).then(value => {
        this.modalCategory.dismiss();
        this.cleanForm();
        this.refresh.emit();
      });
    }
  }


  cleanForm(){
    this.category.reset();
  }

  public toggleOpen(){
    this.isOpen = !this.isOpen;
  }

}
