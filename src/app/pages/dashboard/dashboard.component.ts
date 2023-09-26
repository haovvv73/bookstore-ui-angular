import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataSource: Array<Book> = []
  displayedColumn: Array<string> = ['id', 'title', 'author', 'category', 'price', 'action']

  ngOnInit(): void {
    this.dataSource = [
      {
        id: 1,
        title: 'mua he khong ten',
        author: 'nguyen nhat anh',
        category: 'tieu thuyet',
        price: 100.0
      },
      {
        id:1,
        title:'mua he khong ten',
        author:'nguyen nhat anh',
        category:'tieu thuyet',
        price: 100.0
      },
      {
        id:1,
        title:'mua he khong ten',
        author:'nguyen nhat anh',
        category:'tieu thuyet',
        price: 100.0
      }
    ]
  }

}
