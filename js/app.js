// ajax request for inserting
const submitBtn = document.getElementById("submit");
const studentForm = document.getElementById("submitForm");
const msgContainer = document.getElementById("msg");
const modalBtn = document.getElementById("btn-modal");

modalBtn.addEventListener("click", () => {
  studentForm.reset();
});

// -----------------------------------------
// Create
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let stId = document.getElementById("stId").value;
  let stuName = document.getElementById("stuName").value;
  let fatherName = document.getElementById("fName").value;
  let email = document.getElementById("stuEmail").value;
  let mobileNumber = document.getElementById("stuNumber").value;

  // Now Sending using xhr method
  const xhr = new XMLHttpRequest();

  //   Initiate
  xhr.open("POST", "php/create.php");

  //   Handle request
  xhr.onload = () => {
    if (xhr.status == 200) {
      msgContainer.parentElement.style.display = "block";
      msgContainer.innerHTML = xhr.responseText;
      show();

      setTimeout(() => {
        msgContainer.parentElement.style.display = "none";
      }, 6000);

      //   console.log(xhr.responseText);
    } else {
      console.log("error");
    }
  };

  const mydata = {
    id: stId,
    name: stuName,
    fName: fatherName,
    mail: email,
    number: mobileNumber,
  };
  const data = JSON.stringify(mydata);
  //   console.log(data);

  xhr.send(data);
  studentForm.reset();
});

//  ------------------------------------------------
// For Read
let table = document.getElementById("tbody");

function show() {
  tbody.innerHTML = "";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "php/read.php");
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status == 200) {
      //   console.log(xhr.response);
      if (xhr.response) {
        x = xhr.response;
      } else {
        x = "";
      }
      for (let i = 0; i < x.length; i++) {
        table.innerHTML += `<tr>
        <th scope="row">${"S-" + x[i].Id}</th>
        <td>${x[i].Name}</td>
        <td>${x[i].FatherName}</td>
        <td>${x[i].Email}</td>
        <td>${x[i].Mobile}</td>
        <td>
        <button class="btn btn-edit btn-warning btn-sm" data-id = "${
          x[i].Id
        }"><i
        class="bi bi-pencil-square"></i></button>
        <button class="btn btn-delete btn-danger btn-sm" data-id = "${
          x[i].Id
        }"><i
        class="bi bi-trash text-dark"></i></button>  
        </td>
        </tr> `;
      }
    } else {
      console.log("Error");
    }
    stuDelete();
    stuEdit();
  };

  xhr.send();
}
show();

// -----------------------------
// Delete
function stuDelete() {
  let x = document.getElementsByClassName("btn-delete");

  for (let i = 0; i < x.length; i++) {
    x[i].addEventListener("click", () => {
      id = x[i].getAttribute("data-id");

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "php/delete.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        if (xhr.status == 200) {
          msgContainer.parentElement.style.display = "block";
          msgContainer.innerHTML = xhr.responseText;
          show();

          setTimeout(() => {
            msgContainer.parentElement.style.display = "none";
          }, 6000);
        } else {
          console.log("Network Problem");
        }
      };

      const mydata = { sid: id };
      const data = JSON.stringify(mydata);
      xhr.send(data);
    });
  }
}

// ----------------------------------
// Edit or Update
function stuEdit() {
  let x = document.getElementsByClassName("btn-edit");
  let stId = document.getElementById("stId");
  let stuName = document.getElementById("stuName");
  let fatherName = document.getElementById("fName");
  let email = document.getElementById("stuEmail");
  let mobileNumber = document.getElementById("stuNumber");

  for (let i = 0; i < x.length; i++) {
    x[i].addEventListener("click", () => {
      id = x[i].getAttribute("data-id");
      // for showing modal
      new bootstrap.Modal(document.querySelector("#form-modal")).show();

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "php/update.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        if (xhr.status == 200) {
          let text = JSON.parse(xhr.response);

          stId.value = text.Id;
          stuName.value = text.Name;
          fatherName.value = text.FatherName;
          email.value = text.Email;
          mobileNumber.value = text.Mobile;
        } else {
          console.log("Network Problem");
        }
      };

      const mydata = { sid: id };
      const data = JSON.stringify(mydata);
      xhr.send(data);
    });
  }
}
