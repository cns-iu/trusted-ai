(self.webpackChunktrust_ai=self.webpackChunktrust_ai||[]).push([[886],{"./src/app/app.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,default:()=>app_component_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.js");var app_componentngResource=__webpack_require__("./src/app/app.component.scss?ngResource"),app_componentngResource_default=__webpack_require__.n(app_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2020/core.mjs"),router=__webpack_require__("./node_modules/@angular/router/fesm2020/router.mjs");var navbar_componentngResource=__webpack_require__("./src/app/navbar/navbar.component.scss?ngResource"),navbar_componentngResource_default=__webpack_require__.n(navbar_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2020/common.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2020/icon.mjs");let NavbarComponent=class NavbarComponent{};NavbarComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"trust-ai-navbar",standalone:!0,imports:[common.CommonModule,icon.Ps],template:'<div class="navbar-content">\n  <div class="logo">Career Explorer</div>\n  <a href="/faq">\n    <img class="faq-link" src="../../../assets/icons/info.png" />\n  </a>\n</div>\n',styles:[navbar_componentngResource_default()]})],NavbarComponent);var page_footer_componentngResource=__webpack_require__("./src/app/page-footer/page-footer.component.scss?ngResource"),page_footer_componentngResource_default=__webpack_require__.n(page_footer_componentngResource);let PageFooterComponent=class PageFooterComponent{};PageFooterComponent=(0,tslib_es6.gn)([(0,core.Component)({selector:"trust-ai-page-footer",standalone:!0,imports:[common.CommonModule],template:'<div class="partner-links">\n  <div class="section-header">\n    <div class="section-title">Thanks to our partners</div>\n    <div class="divider"></div>\n  </div>\n  <div class="link-list">\n    <a href="">\n      <img src="../../assets/navsea.png" />\n    </a>\n    <a href="">\n      <img src="../../assets/onet.png" />\n    </a>\n    <a href="">\n      <img src="../../assets/luddy.png" />\n    </a>\n  </div>\n</div>\n<div class="cns-link">\n  <div class="section-header">\n    <div class="section-title">Learn about our research center</div>\n    <div class="divider"></div>\n  </div>\n  <div class="link-list">\n    <a href="">\n      <img src="../../assets/CNS logo.png" />\n    </a>\n  </div>\n</div>\n',styles:[page_footer_componentngResource_default()]})],PageFooterComponent);let AppComponent=class AppComponent{constructor(){this.title="trust-ai"}};AppComponent=(0,tslib_es6.gn)([(0,core.Component)({standalone:!0,imports:[NavbarComponent,PageFooterComponent,router.Bz],selector:"trust-ai-root",template:'<trust-ai-navbar></trust-ai-navbar>\n\n<div class="page-content">\n  <router-outlet></router-outlet>\n</div>\n\n<trust-ai-page-footer></trust-ai-page-footer>\n',styles:[app_componentngResource_default()]})],AppComponent);const app_component_stories={title:"AppComponent",component:AppComponent},Primary={render:args=>({props:args}),args:{}}},"./src/app/app.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".page-content,\ntrust-ai-page-footer {\n  position: relative;\n  top: 4.5rem;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./src/app/navbar/navbar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  display: flex;\n  justify-content: center;\n  position: fixed;\n  width: 100%;\n  height: 4.5rem;\n  background: rgba(255, 255, 255, 0.8);\n  box-shadow: 0px 2px 0.5rem rgba(0, 0, 0, 0.16);\n  -webkit-backdrop-filter: blur(0.25rem);\n          backdrop-filter: blur(0.25rem);\n  z-index: 99;\n}\n:host .navbar-content {\n  display: flex;\n  width: calc(100% - 14rem);\n  justify-content: space-between;\n  align-items: center;\n}\n:host .navbar-content .logo {\n  font-size: 1.5rem;\n  color: #22005d;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./src/app/page-footer/page-footer.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host .partner-links,\n:host .cns-link,\n:host .section-header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n:host .partner-links,\n:host .cns-link {\n  padding: 5rem 2rem;\n  gap: 2.5rem;\n  border-top: 1px solid #cac4cf;\n}\n:host .section-title {\n  font-size: 1.5rem;\n}\n:host .divider {\n  margin-top: 1.5rem;\n  width: 2rem;\n  height: 0.5rem;\n  background: #cfbcff;\n}\n:host .link-list {\n  display: flex;\n  align-items: center;\n  gap: 6.5rem;\n}\n:host .link-list img {\n  filter: grayscale(1);\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);