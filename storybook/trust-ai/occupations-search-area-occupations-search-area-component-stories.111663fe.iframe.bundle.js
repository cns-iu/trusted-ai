(self.webpackChunktrust_ai=self.webpackChunktrust_ai||[]).push([[657],{"./src/app/occupations-search-area/occupations-search-area.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>occupations_search_area_component_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.js");var occupations_search_area_componentngResource=__webpack_require__("./src/app/occupations-search-area/occupations-search-area.component.scss?ngResource"),occupations_search_area_componentngResource_default=__webpack_require__.n(occupations_search_area_componentngResource);var preparedness_dialogngResource=__webpack_require__("./src/app/occupations-search-area/preparedness-dialog.scss?ngResource"),preparedness_dialogngResource_default=__webpack_require__.n(preparedness_dialogngResource);var _class,filters_mobile_dialogngResource=__webpack_require__("./src/app/occupations-search-area/filters-mobile-dialog.scss?ngResource"),filters_mobile_dialogngResource_default=__webpack_require__.n(filters_mobile_dialogngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2020/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2020/core.mjs"),fesm2020_forms=__webpack_require__("./node_modules/@angular/forms/fesm2020/forms.mjs"),fesm2020_button=__webpack_require__("./node_modules/@angular/material/fesm2020/button.mjs"),button_toggle=__webpack_require__("./node_modules/@angular/material/fesm2020/button-toggle.mjs"),dialog=__webpack_require__("./node_modules/@angular/material/fesm2020/dialog.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2020/icon.mjs"),input=__webpack_require__("./node_modules/@angular/material/fesm2020/input.mjs"),menu=__webpack_require__("./node_modules/@angular/material/fesm2020/menu.mjs"),career_card_component=__webpack_require__("./src/app/career-card/career-card.component.ts");let OccupationsSearchAreaComponent=((_class=class OccupationsSearchAreaComponent{constructor(){this.dialog=(0,core.inject)(dialog.uw),this.filters={searchTerm:"",showOccupations:"0",preparednessLevel:"0"},this.menuListItems=[],this.sortBy="",this.numJobs="0",this.filtersChanged=new core.EventEmitter,this.sortChanged=new core.EventEmitter}filtersChange(field,event){this.filters[field]=event.value,this.filtersChanged.emit(this.filters)}inputChange(event){this.filters.searchTerm=event.target.value,this.filtersChanged.emit(this.filters)}openDialog(){this.dialog.open(FiltersMobileDialogComponent,{data:{...this.filters},width:"calc(100% - 2rem)",maxWidth:"30rem",panelClass:"dialog"}).afterClosed().subscribe((result=>{result&&(this.filters=result,this.filtersChanged.emit(this.filters))}))}openPreparednessDialog(){this.dialog.open(PreparednessDialogComponent,{width:"calc(100% - 2rem)",maxWidth:"25.5rem",panelClass:"preparedness-dialog"})}clickMenuItem(item){this.sortBy=item,this.sortChanged.emit(item)}}).propDecorators={filters:[{type:core.Input}],menuListItems:[{type:core.Input}],sortBy:[{type:core.Input}],numJobs:[{type:core.Input}],filtersChanged:[{type:core.Output}],sortChanged:[{type:core.Output}]},_class);OccupationsSearchAreaComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"trust-ai-occupations-search-area",standalone:!0,imports:[common.CommonModule,input.c,icon.Ps,button_toggle.vV,fesm2020_button.ot,fesm2020_forms.UX,dialog.Is,menu.Tx],template:'<div class="mobile-search-filters">\n  <div>Find in list</div>\n  <div class="filters-button" (click)="openDialog()" mat-stroked-button color="primary">Filters</div>\n</div>\n<div class="row1">\n  <div class="search-box">\n    <mat-form-field class="form" appearance="fill" subscriptSizing="dynamic">\n      <input class="search-input" matInput (input)="inputChange($event)" placeholder="Job title, keywords" />\n      <mat-icon class="material-icons">search</mat-icon>\n    </mat-form-field>\n  </div>\n  <button class="preparedness-button" mat-stroked-button color="primary" (click)="openPreparednessDialog()">\n    <div class="label">\n      <mat-icon fontSet="material-icons-outlined" class="info-icon">info</mat-icon>\n      <div>Preparedness Levels</div>\n    </div>\n  </button>\n</div>\n<div class="row2">\n  \x3c!-- disabled until we figure out what to do with this --\x3e\n  <div class="occupations-toggle disabled">\n    Show Occupations\n    <mat-button-toggle-group\n      name="show-occupations-toggle"\n      aria-label="Show Occupations"\n      (change)="filtersChange(\'showOccupations\', $event)"\n    >\n      <mat-button-toggle value="0" checked="{{ filters[\'showOccupations\'] === \'0\' }}">\n        <mat-icon class="checkmark" *ngIf="filters[\'showOccupations\'] === \'0\'">check</mat-icon>\n        All\n      </mat-button-toggle>\n      <mat-button-toggle value="1" checked="{{ filters[\'showOccupations\'] === \'1\' }}">\n        <mat-icon class="checkmark" *ngIf="filters[\'showOccupations\'] === \'1\'">check</mat-icon>\n        Data-level\n      </mat-button-toggle>\n    </mat-button-toggle-group>\n  </div>\n\n  <div class="preparedness-toggle">\n    Preparedness Level\n    <mat-button-toggle-group\n      name="preparedness-toggle"\n      aria-label="Preparedness Level"\n      (change)="filtersChange(\'preparednessLevel\', $event)"\n    >\n      <mat-button-toggle\n        *ngFor="let item of [\'0\', \'1\', \'2\', \'3\', \'4\', \'5\']"\n        value="{{ item }}"\n        checked="{{ filters[\'preparednessLevel\'] === item }}"\n      >\n        <mat-icon class="checkmark" *ngIf="filters[\'preparednessLevel\'] === item">check</mat-icon>\n        {{ item === \'0\' ? \'All\' : item }}\n      </mat-button-toggle>\n    </mat-button-toggle-group>\n  </div>\n</div>\n\n<div class="row3">\n  <div class="counter">{{ numJobs }} occupations</div>\n  <div class="menu">\n    Sort by\n    <button class="sort-button" mat-button [matMenuTriggerFor]="menu">{{ sortBy }}</button>\n    <mat-menu #menu="matMenu" class="sort-menu">\n      <button\n        class="menu-item"\n        [class.selected]="item === sortBy"\n        mat-menu-item\n        *ngFor="let item of menuListItems"\n        (click)="clickMenuItem(item)"\n      >\n        {{ item }}\n      </button>\n    </mat-menu>\n  </div>\n</div>\n\n<button class="preparedness-button-mobile" mat-stroked-button color="primary" (click)="openPreparednessDialog()">\n  <div class="label">\n    <mat-icon fontSet="material-icons-outlined" class="info-icon">info</mat-icon>\n    <div>Preparedness Levels</div>\n  </div>\n</button>\n',styles:[occupations_search_area_componentngResource_default()]})],OccupationsSearchAreaComponent);let PreparednessDialogComponent=class PreparednessDialogComponent{constructor(){this.dialogRef=(0,core.inject)(dialog.so)}cancelClick(){this.dialogRef.close()}preparednessDescription(level){return career_card_component.z[level]}};PreparednessDialogComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"trust-ai-preparedness-dialog",template:'<div class="dialog-container">\n  <div class="dialog-header">\n    Preparedness Levels\n    <mat-icon class="close" (click)="cancelClick()">close</mat-icon>\n  </div>\n  <div class="description">\n    Preparedness Levels group occupations into one of five categories based on levels of education, experience, and\n    training necessary to perform the occupation.\n  </div>\n\n  <div class="list" *ngFor="let n of [1,2,3,4,5]">\n    <img class="preparation-level" src="{{ \'assets/icons/counter_\' + n + \'.svg\' }}" />\n    <div class="preparation-text">{{ preparednessDescription(n) }}</div>\n  </div>\n\n  <div class="button-group">\n    <div class="button" (click)="cancelClick()">Close</div>\n  </div>\n</div>\n',standalone:!0,imports:[common.CommonModule,fesm2020_forms.UX,dialog.Is,icon.Ps],styles:[preparedness_dialogngResource_default()]})],PreparednessDialogComponent);let FiltersMobileDialogComponent=class FiltersMobileDialogComponent{constructor(){this.dialogRef=(0,core.inject)(dialog.so),this.data=(0,core.inject)(dialog.WI),this.filters=this.data}filtersChange(field,event){this.filters[field]=event.value}cancelClick(){this.dialogRef.close()}submitClick(){this.dialogRef.close(this.filters)}};FiltersMobileDialogComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"trust-ai-filters-mobile-dialog",template:'<div class="dialog-container">\n  <div class="dialog-header">\n    Filters\n    <mat-icon class="close" (click)="cancelClick()">close</mat-icon>\n  </div>\n  <div class="preparedness-toggle">\n    Preparedness Level\n    <mat-button-toggle-group\n      name="preparedness-toggle"\n      aria-label="Preparedness Level"\n      (change)="filtersChange(\'preparednessLevel\', $event)"\n    >\n      <mat-button-toggle\n        *ngFor="let item of [\'0\', \'1\', \'2\', \'3\', \'4\', \'5\']"\n        value="{{ item }}"\n        checked="{{ filters[\'preparednessLevel\'] === item }}"\n      >\n        <mat-icon class="checkmark" *ngIf="filters[\'preparednessLevel\'] === item">check</mat-icon>\n        {{ item === \'0\' ? \'All\' : item }}\n      </mat-button-toggle>\n    </mat-button-toggle-group>\n  </div>\n\n  <div class="occupations-toggle disabled">\n    Show Occupations\n    <mat-button-toggle-group\n      name="show-occupations-toggle"\n      aria-label="Show Occupations"\n      (change)="filtersChange(\'showOccupations\', $event)"\n    >\n      <mat-button-toggle value="0" checked="{{ filters[\'showOccupations\'] === \'0\' }}" [disableRipple]="true">\n        <mat-icon class="checkmark" *ngIf="filters[\'showOccupations\'] === \'0\'">check</mat-icon>\n        All\n      </mat-button-toggle>\n      <mat-button-toggle value="1" checked="{{ filters[\'showOccupations\'] === \'1\' }}" [disableRipple]="true">\n        <mat-icon class="checkmark" *ngIf="filters[\'showOccupations\'] === \'1\'">check</mat-icon>\n        Data-level\n      </mat-button-toggle>\n    </mat-button-toggle-group>\n  </div>\n\n  <div class="button-group">\n    <div class="button" (click)="cancelClick()">Cancel</div>\n    <div class="button" (click)="submitClick()">Apply</div>\n  </div>\n</div>\n',standalone:!0,imports:[common.CommonModule,input.c,fesm2020_forms.UX,dialog.Is,fesm2020_button.ot,button_toggle.vV,icon.Ps],styles:[filters_mobile_dialogngResource_default()]})],FiltersMobileDialogComponent);const occupations_search_area_component_stories={title:"OccupationsSearchAreaComponent",component:OccupationsSearchAreaComponent},Primary=(args=>({props:args})).bind({});Primary.args={}},"./src/app/career-card/career-card.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{u:()=>CareerCardComponent,z:()=>PreparednessLevels});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.js");var _class,career_card_componentngResource=__webpack_require__("./src/app/career-card/career-card.component.scss?ngResource"),career_card_componentngResource_default=__webpack_require__.n(career_card_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2020/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2020/core.mjs"),fesm2020_button=__webpack_require__("./node_modules/@angular/material/fesm2020/button.mjs");const PreparednessLevels={1:"Little or No Preparation Needed",2:"Some Preparation",3:"Medium Preparation Needed",4:"Considerable Preparation Needed",5:"Extensive Preparation Needed"};let CareerCardComponent=((_class=class CareerCardComponent{constructor(){this.jobInfo={Occupation:"","Job Zone":"1","Data-level":"",Code:""},this.jobClicked=new core.EventEmitter,this.preparednessLevels=PreparednessLevels}}).propDecorators={jobInfo:[{type:core.Input}],jobClicked:[{type:core.Output}]},_class);CareerCardComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"trust-ai-career-card",standalone:!0,imports:[common.CommonModule,fesm2020_button.ot],template:'<div class="job-title">{{ jobInfo[\'Occupation\'] }}</div>\n<div class="preparation-code">\n  <div class="preparation">\n    <img\n      class="preparation-level"\n      *ngIf="jobInfo[\'Job Zone\'] !== \'n/a\'"\n      src="{{ \'assets/icons/counter_\' + jobInfo[\'Job Zone\'] + \'.svg\' }}"\n    />\n    <div class="preparation-text">{{ preparednessLevels[jobInfo[\'Job Zone\']] }}</div>\n  </div>\n  <div class="code">{{ jobInfo[\'Code\'] }}</div>\n</div>\n<button class="view-button" (click)="jobClicked.emit(jobInfo)" mat-stroked-button>View Occupation</button>\n',styles:[career_card_componentngResource_default()]})],CareerCardComponent)},"./src/app/career-card/career-card.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  align-items: center;\n  padding: 1.5rem;\n  background: #f7f2f7;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);\n  border-radius: 0.75rem;\n  justify-content: space-between;\n  gap: 1rem;\n}\n@media (width <= 1240px) {\n  :host {\n    flex-direction: column;\n    padding: 1rem 1.5rem;\n  }\n  :host .job-title {\n    width: 100% !important;\n  }\n  :host .preparation-code {\n    width: 100% !important;\n    font-size: 0.875rem;\n    font-weight: 500;\n    line-height: 1.25rem;\n    display: flex;\n    padding: 0.25rem 0rem;\n    justify-content: space-between;\n    align-items: center;\n    align-self: stretch;\n  }\n  :host .preparation {\n    width: unset !important;\n  }\n  :host .code {\n    width: unset !important;\n  }\n}\n@media (width <= 600px) {\n  :host {\n    padding: 1.5rem 1rem;\n  }\n}\n:host div {\n  display: flex;\n  gap: 0.5rem;\n}\n:host .job-title {\n  width: 40%;\n  line-height: 1.5rem;\n}\n:host .preparation-code {\n  width: 40%;\n  justify-content: space-between;\n}\n:host .preparation-code .preparation {\n  width: 66%;\n}\n:host .preparation-code .preparation .preparation-text {\n  line-height: 1.5rem;\n}\n:host .preparation-code .code {\n  width: 33%;\n  line-height: 1.5rem;\n}\n:host .view-button {\n  justify-content: center;\n  align-items: center;\n  background: #6750a4;\n  color: white;\n  border-radius: 6.25rem;\n  font-size: 0.875rem;\n  width: 10rem;\n  height: 2.5rem;\n  align-self: flex-end;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./src/app/occupations-search-area/filters-mobile-dialog.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host .close,\n:host .button {\n  cursor: pointer;\n}\n:host .dialog-container {\n  display: flex;\n  flex-direction: column;\n  padding: 1.5rem;\n  gap: 1.5rem;\n  background: #f2ecf1;\n}\n:host .dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 1.5rem;\n  font-weight: 400;\n  line-height: 2rem;\n}\n:host .preparedness-toggle mat-button-toggle {\n  width: 16.6666666667%;\n}\n:host .occupations-toggle mat-button-toggle {\n  width: 50%;\n}\n:host .occupations-toggle,\n:host .preparedness-toggle {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  font-weight: 500;\n  font-size: 0.875rem;\n  color: #22005d;\n}\n:host .occupations-toggle mat-button-toggle-group,\n:host .preparedness-toggle mat-button-toggle-group {\n  border: none;\n  width: 100%;\n}\n:host .occupations-toggle mat-button-toggle-group mat-button-toggle:first-of-type,\n:host .preparedness-toggle mat-button-toggle-group mat-button-toggle:first-of-type {\n  border-left: 1px solid #7a757f !important;\n  border-radius: 6.25rem 0 0 6.25rem;\n}\n:host .occupations-toggle mat-button-toggle-group mat-button-toggle:first-of-type ::ng-deep .mat-ripple,\n:host .preparedness-toggle mat-button-toggle-group mat-button-toggle:first-of-type ::ng-deep .mat-ripple {\n  border-radius: 6.25rem 0 0 6.25rem;\n}\n:host .occupations-toggle mat-button-toggle-group mat-button-toggle:last-of-type,\n:host .preparedness-toggle mat-button-toggle-group mat-button-toggle:last-of-type {\n  border-radius: 0 6.25rem 6.25rem 0;\n}\n:host .occupations-toggle mat-button-toggle-group mat-button-toggle:last-of-type ::ng-deep .mat-ripple,\n:host .preparedness-toggle mat-button-toggle-group mat-button-toggle:last-of-type ::ng-deep .mat-ripple {\n  border-radius: 0 6.25rem 6.25rem 0;\n}\n:host .occupations-toggle mat-button-toggle-group mat-button-toggle,\n:host .preparedness-toggle mat-button-toggle-group mat-button-toggle {\n  border-right: 1px solid #7a757f;\n  border-top: 1px solid #7a757f;\n  border-bottom: 1px solid #7a757f;\n  border-left: none !important;\n  flex-grow: 1;\n}\n:host .occupations-toggle mat-button-toggle-group mat-button-toggle ::ng-deep .mat-button-toggle-label-content,\n:host .preparedness-toggle mat-button-toggle-group mat-button-toggle ::ng-deep .mat-button-toggle-label-content {\n  line-height: 2.5rem;\n  padding: 0;\n}\n:host .occupations-toggle mat-button-toggle-group mat-button-toggle .checkmark,\n:host .preparedness-toggle mat-button-toggle-group mat-button-toggle .checkmark {\n  height: 1.125rem;\n  width: 1.125rem;\n  font-size: 1.125rem;\n}\n:host .occupations-toggle mat-button-toggle-group .mat-button-toggle-checked,\n:host .preparedness-toggle mat-button-toggle-group .mat-button-toggle-checked {\n  background: #e8def8;\n}\n:host .button-group {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n}\n:host .button-group .button {\n  font-size: 0.875rem;\n  padding: 0.625rem 0.75rem;\n  color: #6750a4;\n  font-weight: 500;\n}\n:host .disabled {\n  opacity: 0.5;\n  pointer-events: none;\n}\n\n::ng-deep .dialog .mat-mdc-dialog-surface {\n  border-radius: 1.75rem;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./src/app/occupations-search-area/occupations-search-area.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  width: 100%;\n  display: flex;\n  gap: 1rem;\n  flex-direction: column;\n  padding: 1rem 0 1rem 0;\n}\n@media (width <= 1240px) {\n  :host .row1 .search-box {\n    width: 100%;\n  }\n  :host .row1 .preparedness-button {\n    display: none;\n  }\n  :host .row2 {\n    display: none !important;\n  }\n  :host .preparedness-button-mobile {\n    display: unset !important;\n  }\n  :host .filters-button {\n    display: unset !important;\n  }\n}\n:host .row1,\n:host .row2,\n:host .row3 {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n:host .search-box {\n  display: flex;\n  flex-direction: column;\n}\n:host .search-box,\n:host .occupations-toggle {\n  width: 22.25rem;\n}\n:host .preparedness-toggle {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n:host .preparedness-button,\n:host .preparedness-button-mobile {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  padding: 0;\n  border: 1px solid #7a757f;\n  border-radius: 6.25rem;\n  height: 2.5rem;\n}\n:host .preparedness-button .label,\n:host .preparedness-button-mobile .label {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6750a4;\n  letter-spacing: normal;\n  padding: 0 0.625rem;\n}\n:host .mobile-search-filters {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-weight: 500;\n  font-size: 0.875rem;\n  color: #22005d;\n  line-height: 1.25rem;\n}\n:host .preparedness-button-mobile {\n  display: none;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n:host .search-box,\n:host .occupations-toggle,\n:host .preparedness-toggle {\n  font-weight: 500;\n  font-size: 0.875rem;\n  color: #22005d;\n}\n:host .occupations-toggle mat-button-toggle,\n:host .preparedness-toggle mat-button-toggle {\n  border-right: 1px solid #7a757f;\n  border-top: 1px solid #7a757f;\n  border-bottom: 1px solid #7a757f;\n}\n:host .occupations-toggle mat-button-toggle ::ng-deep .mat-button-toggle-label-content,\n:host .preparedness-toggle mat-button-toggle ::ng-deep .mat-button-toggle-label-content {\n  padding: 0;\n  height: 2.5rem;\n  line-height: 2.5rem;\n}\n:host .occupations-toggle mat-button-toggle .checkmark,\n:host .preparedness-toggle mat-button-toggle .checkmark {\n  height: 1.125rem;\n  width: 1.125rem;\n  font-size: 18px;\n}\n:host .occupations-toggle .mat-button-toggle-checked,\n:host .preparedness-toggle .mat-button-toggle-checked {\n  background: #e8def8;\n}\n:host .occupations-toggle .mat-button-toggle:first-of-type,\n:host .preparedness-toggle .mat-button-toggle:first-of-type {\n  border-left: 1px solid #7a757f;\n  border-radius: 6.25rem 0 0 6.25rem;\n}\n:host .occupations-toggle .mat-button-toggle:first-of-type ::ng-deep .mat-ripple,\n:host .preparedness-toggle .mat-button-toggle:first-of-type ::ng-deep .mat-ripple {\n  border-radius: 6.25rem 0 0 6.25rem;\n}\n:host .occupations-toggle .mat-button-toggle:last-of-type,\n:host .preparedness-toggle .mat-button-toggle:last-of-type {\n  border-radius: 0 6.25rem 6.25rem 0;\n}\n:host .occupations-toggle .mat-button-toggle:last-of-type ::ng-deep .mat-ripple,\n:host .preparedness-toggle .mat-button-toggle:last-of-type ::ng-deep .mat-ripple {\n  border-radius: 0 6.25rem 6.25rem 0;\n}\n:host .occupations-toggle {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n}\n:host .occupations-toggle mat-button-toggle {\n  width: 112.5px;\n}\n:host .preparedness-toggle mat-button-toggle {\n  width: 4rem;\n}\n:host .filters-button {\n  display: none;\n  cursor: pointer;\n}\n:host ::ng-deep .mat-mdc-text-field-wrapper {\n  background: #ece6f0;\n  border-radius: 1.75rem;\n}\n:host ::ng-deep .mat-mdc-form-field-infix {\n  display: inline-flex;\n}\n:host ::ng-deep .mdc-line-ripple {\n  display: none;\n}\n:host ::ng-deep .mat-button-toggle-group {\n  border: none;\n}\n:host .disabled {\n  opacity: 0.5;\n  pointer-events: none;\n}\n:host .counter {\n  font-weight: 500;\n  font-size: 0.875rem;\n  color: #22005d;\n  padding: 0.5rem 0;\n  line-height: 1.25rem;\n}\n:host .menu,\n:host .sort-button {\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  letter-spacing: normal;\n}\n:host .menu {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #22005d;\n}\n:host .sort-button {\n  color: #6750a4;\n  padding: 0;\n}\n\n::ng-deep .sort-menu {\n  background: #f2ecf1;\n  border-radius: 0.25rem !important;\n}\n::ng-deep .sort-menu .menu-item.selected {\n  background: #e6e1e6;\n}\n::ng-deep .sort-menu .menu-item span {\n  color: #1c1b1e !important;\n  font-size: 0.875rem !important;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./src/app/occupations-search-area/preparedness-dialog.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  color: #1c1b1e;\n  font-size: 0.875rem;\n}\n:host .close,\n:host .button {\n  cursor: pointer;\n}\n:host .dialog-container {\n  display: flex;\n  flex-direction: column;\n  padding: 1.5rem;\n  gap: 1.5rem;\n  background: #f2ecf1;\n}\n:host .dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 1.5rem;\n  font-weight: 400;\n  line-height: 2rem;\n}\n:host .description {\n  font-weight: 400;\n  line-height: 1.25rem;\n}\n:host .list {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 500;\n}\n:host .button-group {\n  display: flex;\n  padding-top: 0.5rem;\n  justify-content: flex-end;\n  align-items: flex-start;\n  gap: 0.5rem;\n  align-self: stretch;\n}\n:host .button-group .button {\n  color: #6750a4;\n  padding: 0.625rem 0.75rem;\n  font-size: 0.875rem;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 1.25rem; /* 142.857% */\n}\n\n::ng-deep .preparedness-dialog .mat-mdc-dialog-surface {\n  border-radius: 1.75rem;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);