// const apiUrl = "http://127.0.0.1:8000/api/client";

// fetch(apiUrl)
//   .then(response => response.json())
//   .then(result => {
//     console.log(result); // شوفي شكل البيانات هنا في الـ Console

//     const clients = result.data; // المفتاح الصح من الـ API

//     const container = document.getElementById("clientContainer");
//     container.innerHTML = "";

//     clients.forEach(client => {
//       const card = document.createElement("div");
//       card.classList.add("client-card");

//       card.innerHTML = `
//         <h3>${client.name}</h3>
//         <p><strong>job:</strong> ${client.job ?? 'N/A'}</p>
//         <p><strong>address:</strong> ${client.address ?? 'No message'}</p>
//       `;

//       container.appendChild(card);
//     });
//   })
//   .catch(error => {
//     console.error("Error fetching clients:", error);
//   });



// add fixed background to header

let header = document.querySelector("header");

window.onscroll = function(){
    if(this.scrollY >= 50){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }
}

// activate the header menu

let header_links = document.getElementById('links');

function open_close_menu(){
    header_links.classList.toggle('active')
}
