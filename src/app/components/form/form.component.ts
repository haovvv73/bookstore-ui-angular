import { Component, Inject, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/models/book.model';
import { BookDAOService } from 'src/app/service/book-dao.service';
import { Subscription } from 'rxjs';
import { ConfigDialog } from 'src/app/models/configDataDialog.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy {
  @ViewChild('bookForm', { static: false }) bookForm!: NgForm;
  
  bookDaoSubscription : Subscription | undefined
  isCreate = true

  book : Book = {
    title : '',
    author:'',
    category:'',
    price: 0,
    id:-1,
  }

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigDialog,
    private bookDao : BookDAOService
  ) {
    if(data.data){
      this.book = data.data
      this.isCreate = false
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){

    // UPDATE
    if(this.book.id > -1){
      console.log(this.book);
      this.bookDaoSubscription =  this.bookDao.updateBook(this.book).subscribe(result =>{
        // turn on reRender
        this.data.reRender = true
        //response
        this.dialogRef.close(this.data)
      })

    }

    // CREATE
    if(this.book.id === -1){
      console.log(this.book);
      this.bookDaoSubscription = this.bookDao.createBook(this.book).subscribe(result =>{
        // turn on reRender
        this.data.reRender = true
        //response
        this.dialogRef.close(this.data)
      })
    }
  }

  ngOnDestroy(): void {
    if(this.bookDaoSubscription){
      this.bookDaoSubscription.unsubscribe()
    }
  }
}
