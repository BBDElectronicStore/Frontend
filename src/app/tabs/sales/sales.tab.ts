import { AsyncPipe } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.tab.html',
  styleUrls: ['./sales.tab.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    FlexLayoutModule,
    MatCardModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatIcon,
    MatButtonModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent implements OnInit, AfterViewInit {
  constructor(private apiService: ApiService) {}

  //Table
  displayedColumns: string[] = ['order_id', 'persona_id', 'quantity', 'status_name', 'total_cost'];
  dataSource = new MatTableDataSource<Order>(orderData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('personaSearchInput') personaSearchInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    //this.refresh();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  refresh() {
    const inputValue = this.personaSearchInput.nativeElement.value;
    if (inputValue !== '') {
      this.apiService.getSales(inputValue).subscribe(sales => {
        if (sales) {
          console.log("🚀 ~ SalesComponent ~ this.apiService.getSales ~ sales:", sales)
          this.dataSource.data = sales;
        }
      });
    }
    else {
      this.dataSource.data = [];
    }
  }

  onSelectionChange(event: any){
    console.log('onSelectionChange called', event.option.value);
    const filterValue = ''+event.option.value;
    console.log("🚀 ~ SalesComponent ~ onSelectionChange ~ filterValue:", filterValue)
    this.dataSource.filter = filterValue;
  }
}

let orderData: Order[] = [];
