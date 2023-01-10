const BASE_URL = "https://user-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/users/";

const dataPanel = document.querySelector(".data-panel");
const modalContent = document.querySelector(".modal-content");

const userList = [];
axios
  .get(INDEX_URL)
  .then(function (response) {
    userList.push(...response.data.results);
    renderUserCards(userList);
  })
  .catch(function (error) {
    console.log(error);
  });

function renderUserCards(data) {
  let HTMLContent = "";
  data.forEach((user) => {
    HTMLContent += `
  <div class="card m-2" style="width: 10rem" data-bs-toggle="modal" data-bs-target="#modal-user">
    <img src="${user.avatar}" alt="User Avatar" class="card-img-top" data-modal-user-id="${user.id}">
    <div class="card-body" data-modal-user-id="${user.id}">
      <h5 class="card-title" data-modal-user-id="${user.id}">${user.name} ${user.surname}</h5>
    </div>
  </div>
    `;
  });
  dataPanel.innerHTML = HTMLContent;
}

function showUserInfo(event) {
  const id = event.target.dataset.modalUserId;

  const modalTitle = document.querySelector(".modal-title");
  const modalAvatar = document.querySelector(".modal-user-avatar");
  const modalInfo = document.querySelector(".modal-user-info");

  modalTitle.textContent = "";
  modalAvatar.src = "";
  modalInfo.textContent = "";

  axios
    .get(INDEX_URL + id)
    .then(function (response) {
      const data = response.data;
      modalTitle.textContent = data.name + " " + data.surname;
      modalAvatar.src = data.avatar;
      modalInfo.innerHTML = `
       <p>Email: ${data.email}</p>
       <p>Gender: ${data.gender}</p>
       <p>Age: ${data.age}</p>
       <p>Region: ${data.region}</p>
       <p>Birthday: ${data.birthday}</p>
  `;
    })
    .catch(function (error) {
      console.log(error);
    });
}

dataPanel.addEventListener("click", showUserInfo);
