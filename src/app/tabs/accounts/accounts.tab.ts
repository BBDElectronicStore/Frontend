import { AsyncPipe } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../interfaces/customer';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.tab.html',
  styleUrls: ['./accounts.tab.css'],
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsComponent implements OnInit, AfterViewInit {
  constructor(private apiService: ApiService) {}
  //Filters
  myControl = new FormControl('');
  options: string[] = customerData.map(customer => customer.persona_id);
  filteredOptions!: Observable<string[]>;
  //Table
  displayedColumns: string[] = ['customerId', 'personaId'];
  dataSource = new MatTableDataSource<Customer>(customerData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    this.refresh();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  refresh() {
    this.apiService.getCustomers().subscribe(customers => {
      if (customers) {
        console.log("🚀 ~ AccountsComponent ~ this.apiService.getCustomers ~ customers:", customers)
        this.dataSource.data = customers;
        this.filteredOptions = of(customers.map(customer => customer.persona_id));
      }
    });
  }

  onSelectionChange(event: any){
    console.log('onSelectionChange called', event.option.value);
    const filterValue = '' + event.option.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}

let customerData: Customer[] = [];