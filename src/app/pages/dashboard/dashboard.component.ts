import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/components/form/form.component';
import { Book } from 'src/app/models/book.model';
import { BookDAOService } from 'src/app/service/book-dao.service';
import { Subscription } from 'rxjs';
import { ConfigDialog } from 'src/app/models/configDataDialog.model';
import {NgToastService} from 'ng-angular-popup';
import { RespronseObject } from 'src/app/models/responseObject.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  dataSource: Array<Book> = []
  displayedColumn: Array<string> = ['id', 'title', 'author', 'category', 'price', 'action']
  bookDaoSubscription :Subscription[] = [] 

  ngOnInit(): void {}

  constructor(
    public dialog: MatDialog, 
    private bookDao : BookDAOService,
    private toast : NgToastService
  ){
    this.getBooks()
  }

  getBooks(){
    this.bookDaoSubscription[0] = this.bookDao.getBooks().subscribe({
      next:(result : RespronseObject) =>{
        // console.log(result);
        if(result.data){
          this.dataSource = result.data
        }
      },
      error:(error : any)=>{
        // console.log(error);
      }
    })

  }

  // em tách riêng
  deleteBook(id : number){
    this.bookDaoSubscription[1] = this.bookDao.deleteBook(id).subscribe({
      next:(result : RespronseObject) =>{
        console.log(result);
        this.getBooks()
        this.toast.success({detail:"SUCCESS", summary:'Delete success', duration:3000})
      },
      error:(error : any)=>{
        // console.log(error);
      }
    })
  }

  getBookById(id : number){
    this.bookDaoSubscription[2] = this.bookDao.getBookById(id).subscribe({
      next:(result : RespronseObject) =>{
        if(result.data){
          // data book
          const configDataDialog : ConfigDialog = {
            reRender: false,
            data: result.data[0]
          }
          // open dialog
          this.openDialog(configDataDialog)
        }
      },
      error:(error:any)=>{
        // console.log(error);
        
      }
    })

  }

  createBook(){
    const configDataDialog : ConfigDialog = {
      reRender: false,
      data: null
    }
    // open dialog
    this.openDialog(configDataDialog)
  }

  // ------------------

  openDialog(configDataDialog : ConfigDialog): void {
    const dialogRef = this.dialog.open(FormComponent,{
      data:configDataDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result && result.reRender){
        // reRender dashboard
        this.getBooks()
        this.toast.success({detail:"SUCCESS", summary:'Update Data success', duration:3000})
      }
    });
  }

  ngOnDestroy(): void {    
    if(this.bookDaoSubscription.length > 0){
      for(let sub of this.bookDaoSubscription){
        console.log('loop');
        
        if(sub) sub.unsubscribe()
      }
    }
    this.dialog.closeAll()
  }

}
