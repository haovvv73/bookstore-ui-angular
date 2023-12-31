import { Component, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/models/book.model';
import { BookDAOService } from 'src/app/service/book-dao.service';
import { Subscription } from 'rxjs';
import { ConfigDialog } from 'src/app/models/configDataDialog.model';
import { RespronseObject } from 'src/app/models/responseObject.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {

  // property
  bookForm!: FormGroup
  bookDaoSubscription: Subscription | undefined
  isCreate = true

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigDialog,
    private bookDao: BookDAOService,
    private toast: NgToastService
  ) {
    this.bookForm = new FormGroup({
      title: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$")]), 
      author: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$")]),
      category: new FormControl('',Validators.required),
      price: new FormControl('',[Validators.required,Validators.pattern("^[0-9]+$")]),
      id: new FormControl(-1),
    })

    // update
    if (data.data) {
      this.displayForm(data.data)
      this.isCreate = false
    }
  }

  get title(){
    return this.bookForm.get('title')
  }

  get author(){
    return this.bookForm.get('author')
  }

  get category(){
    return this.bookForm.get('category')
  }

  get price(){
    return this.bookForm.get('price')
  }

  // METHOD
  displayForm(book : Book){
    //console.log(book);
    this.bookForm.get('title')?.setValue(book.title)
    this.bookForm.get('author')?.setValue(book.author)
    this.bookForm.get('category')?.setValue(book.category)
    this.bookForm.get('price')?.setValue(book.price)
    this.bookForm.get('id')?.setValue(book.id)
  }

  getForm(): Book{
    return {
      title: this.bookForm.value.title,
      author: this.bookForm.value.author,
      category: this.bookForm.value.category,
      price: this.bookForm.value.price,
      id: this.bookForm.value.id,
    }
  }

  clearForm(): void{
    this.bookForm.get('title')?.setValue('')
    this.bookForm.get('category')?.setValue('')
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.bookForm.invalid) {
      const book = this.getForm()
      
      // UPDATE
      if (book.id > -1) {
        // console.log(book);
        this.bookDaoSubscription = this.bookDao.updateBook(book).subscribe({
          next: (result: RespronseObject) => {
            if (result.status) {
              // turn on reRender
              this.data.reRender = true
              //response
              this.dialogRef.close(this.data)
            }
          },
          error: (error: any) => {
            // console.warn(error);
            if(error.status == 409 && error.ok == false){
              this.toast.error({detail:"ERROR", summary:error.error.error, duration:5000})
              this.clearForm()
            }
          }
        })

      }

      // CREATE
      if (book.id === -1) {
        // console.log(book);
        this.bookDaoSubscription = this.bookDao.createBook(book).subscribe({
          next: (result: RespronseObject) => {
            if (result.status) {
              // turn on reRender
              this.data.reRender = true
              //response
              this.dialogRef.close(this.data)
            }
          },
          error: (error: any) => {
            // console.warn(error);
            if(error.status == 409 && error.ok == false){
              this.toast.error({detail:"ERROR", summary:error.error.error, duration:5000})
              this.clearForm()
            }
          }
        })
      }
    }
  }

  ngOnDestroy(): void {
    if (this.bookDaoSubscription) {
      this.bookDaoSubscription.unsubscribe()
    }
  }
}
