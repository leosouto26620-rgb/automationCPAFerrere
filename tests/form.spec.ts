import { test, expect } from "@playwright/test";
import { FormPage } from "../pages/FormPage";
import { registrationData } from "../data/formData";
import path from "path";

test.describe("Form - Casos Positivos", () => {
  test("TC01 - Completar todos los campos enviando datos validos", async ({
    page,
  }) => {
    const form = new FormPage(page);
    const data = registrationData.validUser;
    const filePath = path.resolve("fixture/img.jpg");
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.fillForm(data);
    await form.uploadFile(filePath);
    await form.clickSubmitBtn();
    await expect(
      page.getByText("Thanks for submitting the form", { exact: true }),
    ).toBeVisible();
    await expect(form.getRowValue("Student Name")).toHaveText(
      `${data.firstName} ${data.lastName}`,
    );
    await expect(form.getRowValue("Student Email")).toHaveText(`${data.email}`);
    await expect(form.getRowValue("Gender")).toHaveText(`${data.gender}`);
    await expect(form.getRowValue("Mobile")).toHaveText(`${data.mobile}`);
    await expect(form.getRowValue("Date of Birth")).toHaveText(
      data.expectedDateOfBirth!,
    );
    await expect(form.getRowValue("Subject")).toHaveText(`${data.subject!}`);

    await expect(form.getRowValue("Hobbies")).toHaveText(
      data.hobbies!.join(", "),
    );
    await expect(form.getRowValue("Picture")).toHaveText(
      path.basename(filePath),
    );
    await expect(form.getRowValue("Address")).toHaveText(
      `${data.currentAddress!}`,
    );
    await expect(form.getRowValue("State and City")).toHaveText(
      `${data.state!} ${data.city!}`,
    );
  });

  test("TC02 - Completar solo campos obligatorios enviando datos validos", async ({
    page,
  }) => {
    const form = new FormPage(page);
    const data = registrationData.mandatoryFieldsOnly;
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.fillForm(data);
    await form.clickSubmitBtn();
    await expect(
      page.getByText("Thanks for submitting the form", { exact: true }),
    ).toBeVisible();
    await expect(form.getRowValue("Student Name")).toHaveText(
      `${data.firstName} ${data.lastName}`,
    );
    await expect(form.getRowValue("Gender")).toHaveText(`${data.gender}`);
    await expect(form.getRowValue("Mobile")).toHaveText(`${data.mobile}`);
  });
  test("TC03 - Seleccionar múltiples hobbies", async ({ page }) => {
    const form = new FormPage(page);
    const data = registrationData.userTest1;
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.fillForm(data);
    await form.uploadFile(path.resolve("fixture/img.jpg"));
    await form.clickSubmitBtn();
    await expect(
      page.getByText("Thanks for submitting the form", { exact: true }),
    ).toBeVisible();
    await expect(form.getRowValue("Student Name")).toHaveText(
      `${data.firstName} ${data.lastName}`,
    );
    await expect(form.getRowValue("Gender")).toHaveText(`${data.gender}`);
    await expect(form.getRowValue("Mobile")).toHaveText(`${data.mobile}`);
    await expect(form.getRowValue("Hobbies")).toHaveText(
      data.hobbies!.join(", "),
    );
  });
});

test.describe("Casos Negativos", () => {
  test("TC04 - Enviar formulario vacio", async ({ page }) => {
    const form = new FormPage(page);
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.clickSubmitBtn();
    await expect(page.locator("#firstName:invalid")).toBeVisible();
    await expect(page.locator("#lastName:invalid")).toBeVisible();
    await expect(page.locator('input[name="gender"]:invalid')).toHaveCount(3);
    await expect(page.locator("#userNumber:invalid")).toBeVisible();
  });
  test("TC05 - Enviar nombre vacio", async ({ page }) => {
    const form = new FormPage(page);
    const data = registrationData.missingFirstName;
    const filePath = path.resolve("fixture/img.jpg");
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.fillForm(data);
    await form.uploadFile(filePath);
    await form.clickSubmitBtn();
    await expect(page.locator("#firstName:invalid")).toBeVisible();
  });
  test("TC06 - Enviar apellido vacio", async ({ page }) => {
    const form = new FormPage(page);
    const data = registrationData.missingLastName;
    const filePath = path.resolve("fixture/img.jpg");
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.fillForm(data);
    await form.uploadFile(filePath);
    await form.clickSubmitBtn();
    await expect(page.locator("#lastName:invalid")).toBeVisible();
  });
  test("TC07 - Enviar celular vacio", async ({ page }) => {
    const form = new FormPage(page);
    const data = registrationData.missingMobile;
    const filePath = path.resolve("fixture/img.jpg");
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.fillForm(data);
    await form.uploadFile(filePath);
    await form.clickSubmitBtn();
    await expect(page.locator("#userNumber:invalid")).toBeVisible();
  });
  test("TC08 - Enviar celular con caracteres no numericos", async ({
    page,
  }) => {
    const form = new FormPage(page);
    const data = registrationData.mobileWithLetters;
    const filePath = path.resolve("fixture/img.jpg");
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.fillForm(data);
    await form.uploadFile(filePath);
    await form.clickSubmitBtn();
    await expect(page.locator("#userNumber:invalid")).toBeVisible();
  });
  test("TC09 - Enviar celular con menos de 10 digitos", async ({ page }) => {
    const form = new FormPage(page);
    const data = registrationData.mobileInvalidFormat;
    const filePath = path.resolve("fixture/img.jpg");
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.fillForm(data);
    await form.uploadFile(filePath);
    await form.clickSubmitBtn();
    await expect(page.locator("#userNumber:invalid")).toBeVisible();
  });
  test("TC10 - Enviar email con formato invalido", async ({ page }) => {
    const form = new FormPage(page);
    const data = registrationData.invalidEmail;
    const filePath = path.resolve("fixture/img.jpg");
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.fillForm(data);
    await form.uploadFile(filePath);
    await form.clickSubmitBtn();
    await expect(page.locator("#userEmail:invalid")).toBeVisible();
  });
  test("TC11 - Enviar genero vacio", async ({ page }) => {
    const form = new FormPage(page);
    const data = registrationData.missingGender;
    const filePath = path.resolve("fixture/img.jpg");
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await form.fillForm(data);
    await form.uploadFile(filePath);
    await form.clickSubmitBtn();
    await expect(page.locator('input[name="gender"]:invalid')).toHaveCount(3);
  });
  test("TC11 - Verificar campo city deshabilitado", async ({ page }) => {
    const form = new FormPage(page);
    await form.goto("/automation-practice-form");
    await expect(
      page.getByRole("heading", { name: "Practice Form" }),
    ).toBeVisible();
    await expect(page.locator('#city [aria-disabled="true"]')).toBeVisible();
    await form.state.click();
    await page.getByText("NCR", { exact: true }).click();
    await expect(page.locator('#city [aria-disabled="true"]')).toHaveCount(0);
  });
});
