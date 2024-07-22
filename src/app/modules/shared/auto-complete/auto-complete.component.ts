import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AgentService} from "../../../services/agent.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {WholesalerService} from "../../../services/wholesaler.service";
import {SimpleWholesaler} from "../../../commons/interfaces/simple-wholesaler";
import {Subject} from "rxjs";

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent {
  @Input()
  wholesalers: SimpleWholesaler[]
  displayModal: any;
  form: FormGroup;
  filteredWholesalers : SimpleWholesaler[]
  codeWholeSalerChanges: Subject<string> = new Subject<string>();
  constructor(
              private router: Router,
              private wholesalerService: WholesalerService,
  ) {

    this.form = new FormGroup({
      codeAgent: new FormControl('', Validators.required),
      codeWholesaler: new FormControl('', Validators.required),
      overdraftMaxDailyCount: new FormControl('', Validators.required),
      overdraftLimitAmount: new FormControl('', Validators.required),
      overdraftBillingOccurrence: new FormControl('', Validators.required),
      penaltyDelayInDays: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    })
    this.displayModal = false
  }
  search = {
    codeWholesalers: '',
    codeAggregator: '',
  }

  toggleModal() {
    this.displayModal = !this.displayModal
  }

  onCodeWholesalerChange(value: any) {
    console.log("Lii lanla: ", value.target.value);
    this.search.codeWholesalers = value;
    this.wholesalerService.getAll(value.target.value).subscribe({
      next: response=> this.filteredWholesalers = response.data
    })
    this.codeWholeSalerChanges.next(value);
  }

  changeWholesaler(codeWholesaler: any) {
    this.form.get('codeWholesaler')?.setValue(codeWholesaler, {
      onlySelf: true,
    })
    this.filteredWholesalers = []
  }

}
