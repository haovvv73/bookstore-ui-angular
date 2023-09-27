import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/components/form/form.component';
import { Book } from 'src/app/models/book.model';
import { BookDAOService } from 'src/app/service/book-dao.service';
import { Subscription } from 'rxjs';
import { ConfigDialog } from 'src/app/models/configDataDialog.model';

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

  constructor(public dialog: MatDialog, private bookDao : BookDAOService){
    this.getBooks()
  }

  getBooks(){
    this.bookDaoSubscription[0] = this.bookDao.getBooks().subscribe(result =>{
      console.log(result);
      if(result.data){
        this.dataSource = result.data
      }
    })

  }

  deleteBook(id : number){
    this.bookDaoSubscription[1] = this.bookDao.deleteBook(id).subscribe(result =>{
      console.log(result);
      this.getBooks()
    })
  }

  getBookById(id : number){
    this.bookDaoSubscription[2] = this.bookDao.getBookById(id).subscribe(result =>{
      if(result.data){
        const configDataDialog : ConfigDialog = {
          reRender: false,
          data: result.data[0]
        }
        // open dialog
        this.openDialog(configDataDialog)
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
  }

}
