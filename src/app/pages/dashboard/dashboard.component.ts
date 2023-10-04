import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/components/form/form.component';
import { Book } from 'src/app/models/book.model';
import { BookDAOService } from 'src/app/service/book-dao.service';
import { takeUntil } from 'rxjs';
import { ConfigDialog } from 'src/app/models/configDataDialog.model';
import {NgToastService} from 'ng-angular-popup';
import { RespronseObject } from 'src/app/models/responseObject.model';
import { UnSub } from 'src/app/abstract/un-sub.abstract';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends UnSub implements OnInit, OnDestroy {
  dataSource: Array<Book> = []
  displayedColumn: Array<string> = ['id', 'title', 'author', 'category', 'price', 'action']

  ngOnInit(): void {}

  constructor(
    public dialog: MatDialog, 
    private bookDao : BookDAOService,
    private toast : NgToastService
  ){
    super()
    this.getBooks()
  }

  getBooks(){
    this.bookDao.getBooks().pipe(takeUntil(super.unsubcribe$)).subscribe({
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

  deleteBook(id : number){
    this.bookDao.deleteBook(id).pipe(takeUntil(super.unsubcribe$)).subscribe({
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
    this.bookDao.getBookById(id).pipe(takeUntil(super.unsubcribe$)).subscribe({
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

    dialogRef.afterClosed().pipe(takeUntil(super.unsubcribe$)).subscribe(result => {
      console.log('The dialog was closed');
      if(result && result.reRender){
        // reRender dashboard
        this.getBooks()
        this.toast.success({detail:"SUCCESS", summary:'Update Data success', duration:3000})
      }
    });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll()
    super.onUnsubcribe()
  }
}
