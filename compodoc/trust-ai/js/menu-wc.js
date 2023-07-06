'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">trust-ai</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CareerCardComponent.html" data-type="entity-link" >CareerCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FaqPageComponent.html" data-type="entity-link" >FaqPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingPageComponent.html" data-type="entity-link" >LandingPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent.html" data-type="entity-link" >NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OccupationsListingsComponent.html" data-type="entity-link" >OccupationsListingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OccupationsPageComponent.html" data-type="entity-link" >OccupationsPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OccupationsSearchAreaComponent.html" data-type="entity-link" >OccupationsSearchAreaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PageFooterComponent.html" data-type="entity-link" >PageFooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileEmploymentComponent.html" data-type="entity-link" >ProfileEmploymentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfilePageComponent.html" data-type="entity-link" >ProfilePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileSalaryComponent.html" data-type="entity-link" >ProfileSalaryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileTechnologySkillsComponent.html" data-type="entity-link" >ProfileTechnologySkillsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchBoxComponent.html" data-type="entity-link" >SearchBoxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkTasksListComponent.html" data-type="entity-link" >WorkTasksListComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AllJobInfo.html" data-type="entity-link" >AllJobInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JobInfo.html" data-type="entity-link" >JobInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SalaryInfo.html" data-type="entity-link" >SalaryInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchFilters.html" data-type="entity-link" >SearchFilters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TechSkill.html" data-type="entity-link" >TechSkill</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkTasks.html" data-type="entity-link" >WorkTasks</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});