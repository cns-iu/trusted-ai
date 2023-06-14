import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let controller: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [SearchBoxComponent],
    });

    component = TestBed.inject(SearchBoxComponent);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets data', () => {
    component.ngOnInit();
    const req = controller.expectOne('assets/data/index.json');
    req.flush('[{"Code":"11111", "Occupation":"title", "Job Zone":1}]');
  });
});
