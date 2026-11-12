import { Page, Locator } from "@playwright/test";
import { RegistrationData } from "../data/formData";

export class FormPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly mobile: Locator;
  readonly birth: Locator;
  readonly subject: Locator;
  readonly uploadPicture: Locator;
  readonly address: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly submitBtn: Locator;

  constructor(private page: Page) {
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.mobile = page.locator("#userNumber");
    this.birth = page.locator("#dateOfBirthInput");
    this.subject = page.locator("#subjectsInput");
    this.uploadPicture = page.locator("#uploadPicture");
    this.address = page.locator("#currentAddress");
    this.state = page.locator("#state");
    this.city = page.locator("#city");
    this.submitBtn = page.locator("#submit");
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async fillForm(data: RegistrationData) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    if (data.email) await this.email.fill(data.email);
    if (data.gender) {
      await this.page
        .getByRole("radio", { name: data.gender, exact: true })
        .check();
    }
    await this.mobile.fill(data.mobile);
    if (data.dateOfBirth) await this.birth.fill(data.dateOfBirth);
    if (data.subject) {
      await this.subject.fill(data.subject);
      await this.page.getByText(data.subject, { exact: true }).click();
    }
    for (const hobby of data.hobbies ?? []) {
      await this.page
        .getByRole("checkbox", { name: hobby, exact: true })
        .click();
    }
    if (data.currentAddress) await this.address.fill(data.currentAddress);
    if (data.state) {
      await this.state.click();
      await this.page.getByText(data.state, { exact: true }).click();
    }
    if (data.city) {
      await this.city.click();
      await this.page.getByText(data.city, { exact: true }).click();
    }
  }

  async uploadFile(filePath: string) {
    await this.uploadPicture.setInputFiles(filePath);
  }

  async clickSubmitBtn() {
    await this.submitBtn.click();
  }

  getRowValue(label: string) {
    return this.page.locator("tr", { hasText: label }).locator("td").nth(1);
  }
}
