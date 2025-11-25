// const 2 = "http://127.0.0.1:8000/api/client";

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



const form = document.getElementById('form');
const responseEl = document.getElementById('contactResponse'); // عنصر لعرض الرسائل

// linking api the form in section of the contacts
const apiUrl = "http://127.0.0.1:8000/api/message"; // عدّلي لو عنوانك مختلف

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  responseEl.style.color = 'black';
  responseEl.textContent = 'Sending...';

  const formData = new FormData(form);

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json' // لازم ليه عشان نطلب JSON من الباك
      }
    });

    const data = await res.json();

    if (!res.ok) {
      // عرض رسائل الفاليديشن لو موجودة
      responseEl.style.color = 'red';
      if (data.errors) {
        const msgs = Object.values(data.errors).flat().join(' | ');
        responseEl.textContent = msgs;
      } else {
        responseEl.textContent = data.message || 'Something went wrong';
      }
    } else {
      responseEl.style.color = 'green';
      responseEl.textContent = data.message || 'Message sent successfully!';
      form.reset(); // تفضّي الحقول عند النجاح
    }
  } catch (err) {
    responseEl.style.color = 'red';
    responseEl.textContent = 'Network error';
    console.error('Fetch error:', err);
  }
});


// linking the front with the back
const apiUrl2 = `http://127.0.0.1:8000/api/client/1?t=${new Date().getTime()}`;

fetch(apiUrl2)
  .then(response => response.json())
  .then(data => {
    if (data.status === 200) {
      const client = data.data;
      
      // show data from datebase
      // header
      const header = document.querySelector(".container .icons");
      if(client.contact){
        header.innerHTML = `
          <a href="${client.contact.linkedin}"><i class="fa-brands fa-linkedin"></i></a>
          <a href="${client.contact.facebook}"><i class="fa-brands fa-facebook"></i></a>
          <a href="${client.contact.instagram}"><i class="fa-brands fa-square-instagram"></i></a>
          <span class="list_menu" onclick="open_close_menu()"><i class="fa-solid fa-bars"></i></span>
          `;
        }

      // home & about me
      document.querySelector(".name_client").textContent = client.name;
      document.querySelector(".field_client").textContent = client.field;
      document.querySelector(".aboutme_content").textContent = client.about.content;
      document.querySelector(".job_client").textContent = client.job;
      document.querySelector(".location").textContent = client.location;
      document.querySelector(".experience").textContent = client.experience;
      
      // عرض الصورة
      if (client.image) {
        document.querySelectorAll(".client_image").forEach(img => {
          img.src = `http://127.0.0.1:8000/storage/${client.image}`;
        });
      } // no else
        
        // // // // // // skills

        const softSkills = document.querySelector(".box:nth-child(1) ul");
        const technicalSkills = document.querySelector(".box:nth-child(2) ul");
        const courses = document.querySelector(".box:nth-child(3) ul");
        
        softSkills.innerHTML = "";
        technicalSkills.innerHTML = "";
        courses.innerHTML = "";
      
      // technical skills
      client.skills.forEach(skill => {
        if(skill.type.toLowerCase() === "technical skill"){
          let innerHTML = `<li><strong><i style="margin-right: 10px" class="fa-solid fa-check"></i>${skill.title} :</strong></li>`
          skill.content.forEach(item => {
            innerHTML += `<li style="margin-left: 30px"><i style="font-size: 10px; margin-top: 5px;" class="fa-solid fa-circle"></i>${item}</li>`;
          });
          technicalSkills.innerHTML += innerHTML;
        }
      })

       // soft skills
        client.skills.forEach(skill => {
        if(skill.type.toLowerCase() === "soft skills"){
          skill.content.forEach(item => {
            softSkills.innerHTML += `<li><i class="fa-solid fa-check"></i>${item}</li>`
          })
        }
      })
      
      // courses
      client.skills.forEach(skill => {
        if(skill.type.toLowerCase() === "courses"){
          skill.content.forEach(item => {
            courses.innerHTML += `<li><i class="fa-solid fa-check"></i>${item}</li>`
          })
        }
      })
      
      // // // // // projects

      const containerProjects = document.querySelector(".container_projects");

      containerProjects.innerHTML = `
        <div class="top_section">
          <h2>explore our popular <span>projects</span></h2>
        </div>`;

      client.projects.forEach((project, index) => {
        const projectBox = document.createElement("div");
        projectBox.classList.add("project_box");

        if((index+1)%2 === 0){
          projectBox.classList.add("project_box_2");
        }

        projectBox.innerHTML = `
          <img class="project_image" src="http://127.0.0.1:8000/storage/${project.image}" alt="project for you">
            <div class="content">
              <h4><span class="project_title">${project.title}</span></h4>
              <h3 ><a href="" class="project_category">${project.category}</a></h3>
              <p class="project_description">${project.description}</p>

              <a href="${project.link}" class="link project_link"><i class="fa-solid fa-link"></i></a>
            </div>
          `;

           containerProjects.appendChild(projectBox);
      })

      // // // // // contacts
      const contacts = document.querySelector(".social_links .links")
      if(client.contact){
        contacts.innerHTML = `
          <a href="tel:${client.contact.phone}"><i class="fa-solid fa-phone"></i>${client.contact.phone}</a>
          <a href="mailto:${client.contact.email}"><i class="fa-solid fa-envelope"></i>${client.contact.email}</a>
          <a href="${client.contact.github}" target="_blank"><i class="fa-brands fa-github"></i>Github</a>
          <a href="${client.contact.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i>Linkedin</a>
          <a href="${client.contact.facebook}" target="_blank"><i class="fa-brands fa-facebook"></i>Facebook</a>
        `;
      }

    }
  })


  //////////////////////////////////////////////// loading

  function loader(){
    document.querySelector('.loader').classList.add('fade-out')
}

function fadeOut(){
    setInterval(loader, 2000)
}

window.onload = fadeOut;
