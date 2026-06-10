import { Page, Locator } from '@playwright/test';


export class NavComponent {
  readonly sideBarLink!:     Locator;
  readonly catalogIcon!:Locator;
  readonly itemIcon!:Locator;
  readonly CrmIcon!: Locator;
  readonly customerIcon!: Locator;
  readonly attributeIcon!: Locator;


  constructor(public page: Page) {
    this.sideBarLink = page.locator("//*[@class='router-sidebar router-sidebar-default show-closed-router-sidebar']"); //the side bar
    this.catalogIcon = page.locator("div").filter({ hasText: /^Catalog$/ }).first();
    this.itemIcon = page.getByText('Items', { exact: true }).first();
    this.CrmIcon = page.locator('div').filter({ hasText: /^CRM$/ }).first()
    this.customerIcon = page.getByText('Customers');
    this.attributeIcon = page.getByText('Attributes');
  }


  async goToSideBar() {
    await this.sideBarLink.hover()
  }


  async goToItem() {
    await this.goToSideBar()
    await this.catalogIcon.click(); //Click 'Catalog Icon' in side bar
    await this.itemIcon.first().click(); //Click 'Items' option under catalog
  }


  async goToCustomer() {
    await this.goToSideBar()
    await this.CrmIcon.click()
    await this.customerIcon.waitFor({ state: 'visible' });
    await this.customerIcon.click()
  }

  async goToAttribute() {
    await this.goToSideBar()
    await this.catalogIcon.click(); //Click 'Catalog Icon' in side bar
    await this.attributeIcon.click();
  }
 
}


