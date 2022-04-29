import { Component, Input } from '@angular/core';
import { BaseComponent, GlobalStateService } from '@app/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent extends BaseComponent {
  @Input() set initialSelection(val: string) {
    if (val) {
      this.selectedCategory = this.categories.find(
        (category) => category.name === val
      ) as { name: string };
      this.informMain();
    }
  }
  title = 'nav';
  categories = [
    { name: 'Action' },
    { name: 'Animation' },
    { name: 'Comedy' },
    { name: 'Horror' },
  ];
  selectedCategory!: { name: string };

  constructor(private state: GlobalStateService) {
    super();
  }

  showDetails(index: number) {
    this.selectedCategory = this.categories[index];
    this.informMain();
  }

  private informMain() {
    this.state.sendData(this.selectedCategory.name);
  }
}
