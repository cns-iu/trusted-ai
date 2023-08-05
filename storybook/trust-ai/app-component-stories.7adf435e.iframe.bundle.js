(self.webpackChunktrust_ai=self.webpackChunktrust_ai||[]).push([[886],{"./src/app/app.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>app_component_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.js");var app_componentngResource=__webpack_require__("./src/app/app.component.scss?ngResource"),app_componentngResource_default=__webpack_require__.n(app_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2020/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2020/core.mjs"),fesm2020_button=__webpack_require__("./node_modules/@angular/material/fesm2020/button.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2020/icon.mjs"),router=__webpack_require__("./node_modules/@angular/router/fesm2020/router.mjs"),fromEvent=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js");var _class,navbar_componentngResource=__webpack_require__("./src/app/navbar/navbar.component.scss?ngResource"),navbar_componentngResource_default=__webpack_require__.n(navbar_componentngResource),filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let NavbarComponent=((_class=class NavbarComponent{constructor(){this.router=(0,core.inject)(router.F0),this.notHome$=this.router.events.pipe((0,filter.h)((event=>event instanceof router.m2)),(0,map.U)((event=>!("/"===event.url))))}}).ctorParameters=()=>[],_class);NavbarComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"trust-ai-navbar",standalone:!0,imports:[common.CommonModule,icon.Ps,router.Bz],template:'<div class="navbar-content">\n  <a class="home-icon" *ngIf="notHome$ | async" routerLink="/">\n    <mat-icon fontSet="material-icons-outlined">home</mat-icon>\n  </a>\n  <div routerLink="/" class="logo">Career Explorer</div>\n  <a class="faq-link" routerLink="/faq">\n    <mat-icon fontSet="material-icons-outlined" class="info-icon">info</mat-icon>\n  </a>\n</div>\n',styles:[navbar_componentngResource_default()]}),(0,tslib_es6.w6)("design:paramtypes",[])],NavbarComponent);var page_footer_componentngResource=__webpack_require__("./src/app/page-footer/page-footer.component.scss?ngResource"),page_footer_componentngResource_default=__webpack_require__.n(page_footer_componentngResource);let PageFooterComponent=class PageFooterComponent{};PageFooterComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"trust-ai-page-footer",standalone:!0,imports:[common.CommonModule],template:'<div class="partner-links">\n  <div class="section-header">\n    <div class="section-title">Thanks to our partners</div>\n  </div>\n  <div class="link-list">\n    <a href="https://www.navsea.navy.mil/Home/Warfare-Centers/NSWC-Crane/">\n      <img src="assets/navsea.svg" />\n    </a>\n    <a href="https://www.onetonline.org/">\n      <img src="assets/onet.svg" />\n    </a>\n    <a href="https://luddy.indiana.edu/">\n      <img src="assets/luddy.svg" />\n    </a>\n    <a href="https://www.bls.gov/">\n      <img src="assets/bls.png" />\n    </a>\n  </div>\n</div>\n<div class="cns-link">\n  <div class="section-header">\n    <div class="section-title">Learn about our research center</div>\n  </div>\n  <div class="link-list">\n    <a href="https://cns.iu.edu/">\n      <img src="assets/CNS logo.svg" />\n    </a>\n  </div>\n</div>\n',styles:[page_footer_componentngResource_default()]})],PageFooterComponent);let AppComponent=class AppComponent{constructor(){this.router=(0,core.inject)(router.F0),this.showBackToTop=!1,this.longPage=!1}ngOnInit(){this.router.events.subscribe((event=>{event instanceof router.m2&&(this.longPage=event.url.includes("occupations")||event.url.includes("profile"),this.scrollToTop())})),this.correctTooltipPosition(),this.handleScroll()}handleScroll(){(0,fromEvent.R)(document,"scroll").subscribe((()=>{const tooltip=document.getElementById("vg-tooltip-element");tooltip&&(tooltip.className="vg-tooltip"),this.showBackToTop=!!this.longPage&&window.scrollY>1e3}))}correctTooltipPosition(){(0,fromEvent.R)(document,"click").subscribe((()=>{const tooltip=document.getElementById("vg-tooltip-element");tooltip&&parseInt(tooltip.style.left.replace("px",""))<0&&(tooltip.style.left="0px")}))}scrollToTop(){window.scrollTo(0,0)}};AppComponent=(0,tslib_es6.gn)([(0,core.Component)({standalone:!0,imports:[common.CommonModule,NavbarComponent,PageFooterComponent,router.Bz,icon.Ps,fesm2020_button.ot],selector:"trust-ai-root",template:'<trust-ai-navbar></trust-ai-navbar>\n\n<router-outlet></router-outlet>\n\n<trust-ai-page-footer></trust-ai-page-footer>\n\n<button mat-button *ngIf="showBackToTop" class="back-to-top" (click)="scrollToTop()">\n  <mat-icon>arrow_upward</mat-icon>\n  Back to Top\n</button>\n',styles:[app_componentngResource_default()]})],AppComponent);const app_component_stories={title:"AppComponent",component:AppComponent},Primary={render:args=>({props:args}),args:{}}},"./src/app/app.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"router-outlet,\ntrust-ai-page-footer {\n  position: relative;\n}\n\n.back-to-top {\n  position: fixed;\n  bottom: 2rem;\n  right: 1rem;\n  border-radius: 1rem;\n  background: #e9ddff;\n  color: #22005d;\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);\n  padding: 1rem 1.25rem 1rem 1rem;\n  letter-spacing: normal;\n  z-index: 1;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./src/app/navbar/navbar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  font-family: Lexend;\n  display: flex;\n  justify-content: center;\n  position: fixed;\n  width: 100%;\n  height: 4.5rem;\n  background: rgba(255, 255, 255, 0.8);\n  box-shadow: 0px 2px 0.5rem rgba(0, 0, 0, 0.16);\n  -webkit-backdrop-filter: blur(0.25rem);\n          backdrop-filter: blur(0.25rem);\n  z-index: 99;\n}\n@media (width <= 600px) {\n  :host .navbar-content {\n    width: calc(100% - 2rem) !important;\n  }\n}\n@media (width > 600px) {\n  :host .home-icon {\n    display: none !important;\n  }\n}\n@media (600px < width < 1240px) {\n  :host .navbar-content {\n    width: calc(100% - 4rem) !important;\n  }\n}\n:host .navbar-content {\n  display: flex;\n  width: 80%;\n  max-width: 80rem;\n  justify-content: space-between;\n  align-items: center;\n}\n:host .navbar-content .logo {\n  display: flex;\n  font-size: 1.5rem;\n  color: #22005d;\n  cursor: pointer;\n}\n:host .navbar-content .home-icon,\n:host .navbar-content .faq-link {\n  display: flex;\n  color: #22005d;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./src/app/page-footer/page-footer.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  font-family: Lexend;\n  width: 100%;\n}\n@media (width <= 1240px) {\n  :host .partner-links,\n  :host .cns-link {\n    padding: 3rem 0rem !important;\n    gap: 2.5rem !important;\n  }\n  :host .link-list {\n    gap: 2.5rem !important;\n  }\n}\n@media (width < 768px) {\n  :host .link-list {\n    flex-direction: column;\n  }\n}\n@media (600px < width < 1240px) {\n  :host .section-title {\n    font-size: 1rem !important;\n    line-height: 1.25rem !important;\n    letter-spacing: 0.02rem !important;\n  }\n}\n@media (width < 600px) {\n  :host .section-title {\n    font-size: 0.875rem !important;\n    line-height: 1.25rem !important;\n  }\n}\n:host .partner-links,\n:host .cns-link,\n:host .section-header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n:host .partner-links,\n:host .cns-link {\n  padding: 5rem 2rem;\n  gap: 2.5rem;\n  border-top: 1px solid #cac4cf;\n}\n:host .section-title {\n  font-size: 1.5rem;\n  text-align: center;\n  line-height: 1.25rem;\n  letter-spacing: 0.03rem;\n}\n:host .link-list {\n  display: flex;\n  align-items: center;\n  gap: 6.5rem;\n}\n:host .link-list img {\n  filter: grayscale(1);\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);