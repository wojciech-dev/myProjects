const form = document.querySelector(".form");
const alert = document.querySelector(".alert");
const popup = document.createElement("div");
const inputAll = document.querySelectorAll(".inp");
const textArea = document.querySelector(".form_input-area");

class Validator {
  constructor(form) {
    this.form = form;
    this.fields = this.form.querySelectorAll(".form_input");
    this.errors = [];
  }

  displayModal(warning) {
    let md = `
      <div class="modal-content">
        <span class="cross cross-modal">x</span>
        <h1 class="modal-header">${warning}</h1>
        <button class="modal-btn">Close</button>
      </div>
  `;
    popup.classList.add("modal");
    popup.innerHTML = md;
    document.body.appendChild(popup);
    const modal = document.querySelector(".modal");
    modal.classList.add("show-modal");

    if (modal.classList.contains("show-modal")) {
      modal.addEventListener("click", () => {
        modal.classList.remove("show-modal");
      });
    }
  }

  clearAllInput() {
    inputAll.forEach(item => (item.value = ""));
  }

  valid(field) {
    field.classList.remove("invalid");
    field.classList.add("valid");
  }

  invalid(field) {
    field.classList.remove("valid");
    field.classList.add("invalid");
  }

  validateFields(field) {
    let fieldValid = field.validity.valid;

    if (fieldValid) {
      this.valid(field);
    } else {
      this.errors.push(field.dataset.error);
      this.invalid(field);
    }
  }

  validTextarea() {
    const check = /^[0-9ąęłóężźća-zA-ĆŃÓŁŻŹĄĆ\s.,]+$/g;
    let val = [...document.querySelector(".form_input-area").value.split("\n")];

    for (let i = 0; i < val.length; i++) {
      if (!val[i].match(check)) {
        console.log(`error: ${val[i]}`);
        this.errors.push(textArea.dataset.error);
        this.invalid(textArea);
        return false;
      } else {
        console.log("ok");
        this.valid(textArea);
        return true;
      }
    }
  }

  validate() {
    for (let i = 0; i < this.fields.length; i++) {
      this.validateFields(this.fields[i]);
    }

    this.validTextarea();

    if (this.errors.length <= 0) {
      alert.classList.remove("invalid");
      return true;
    } else {
      alert.classList.add("invalid");
      alert.innerHTML = "";
      for (let key of this.errors) {
        alert.innerHTML += `<li>${key}</li>`;
      }
      return false;
    }
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  let valid = new Validator(form);
  let formValid = valid.validate();
  if (formValid) {
    valid.displayModal("Mssage has been sent:)");
    valid.clearAllInput();
  } else {
    return false;
  }
});