let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");



// Problem 1. List of pitches on page load [3}
let productData = [];

let mainSection = document.getElementById("data-list-wrapper");
function fetchdata() {
  fetch("http://localhost:3000/pitches")
    .then((res) => res.json())
    .then((data) => {
      productData = data;
      showdata(data);
    })
    .catch((err) => {
      showdata(err);
    });
}

fetchdata();

function showdata(data) {
  let show = data.map((el) =>
    storeData(el.id, el.image, el.title, el.founder, el.category, el.price)
  );
  mainSection.innerHTML = show.join(" ");
}

function storeData(id, image, title, founder, category, price) {
  let store = `

        <div class="card" data-id="${id}">
        <a href="discription.html"></a>

                <div class="card-img">
                  <img src="${image}" alt=""${title}" higth="500px" width="400px">


                </div>
                <div class="card-body">
                  <h4 class="card-title">${title}</h4>
                  <p class="card-founder">${founder}</p>
                  <p class="class-founder">${category}</p>
                  <p class="class-category">${price}</p>
                  <a href="#" data-id="${id}" class="card-link">Edit</a>
                  <button class="card-button" data-id="${id}">Delete</button>
                </div>

              </div>
    `;

  return store;
}

pitchCreateBtn.addEventListener("click", () => {
  let product = {
    title: pitchTitleInput.value,
    image: pitchImageInput.value,
    category: pitchCategoryInput.value,
    founder: pitchfounderInput.value,
    price: pitchPriceInput.value,
  };

  fetch("http://localhost:3000/pitches", {
    method: "POST",
    headers: {
      "Content-Type": "applications/json",
    },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => fetchdata())
    .catch((err) => console.log(err));
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-button")) {
    deleteproduct(e.target.dataset.id);
  }
});

function deleteproduct(id) {
  fetch(`http://localhost:3000/pitches/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data), alert("delete success");
    });
}


document.addEventListener('click',(e)=>
{
    if(e.target.classList.contains('card-link'))
    {
        console.log(e.target.dataset.id);
        updateData(e.target.dataset.id);
    }
});
function updateData(id)
{
    fetch(`http://localhost:3000/pitches/${id}`)
    .then((res) =>res.json())
    .then((data)=>{
        (updatePitchIdInput.value =data.id),
        (updatePitchTitleInput.value =data.title),
        (updatePitchImageInput.value =data.image),
        (updatePitchCategoryInput.value=data.category),
        (updatePitchfounderInput.value =data.founder),
        (updatePitchPriceInput.value = data.price);

    })
}
updatePitchBtn.addEventListener('click',() =>
{
    let updateObj = {
        id:updatePitchIdInput.value,
        title:updatePitchTitleInput.value,
        image:updatePitchImageInput.value,
        category:updatePitchCategoryInput.value,
        founder:updatePitchfounderInput.value,
        price:updatePitchPriceInput.value,
    };
    console.log(updateObj);
    fetch(`http://localhost:3000/pitches/${updateObj.id}`,
        {
            method :"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(updateObj),
        }
    )
    .then((res) => res.json())
    .then((data) =>{
        console.log(data);
    })
    .catch((err)=>alert(err));
})
