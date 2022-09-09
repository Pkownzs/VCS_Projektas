//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});

// Dynamic elements from json

fetch("./js/dynamic.json")
    .then(response => response.json())
    .then(dataList => {
        for (const data of dataList) {
            const tempalte = `<div class="col-lg-4 col-sm-6"><div class="portfolio-box"><img class="img-fluid" src="${data.image}" onclick="openModal(this)" data-name="${data.name}" data-desc="${data.description}" alt="Robot Worker Work in progress"></div>`

            document.querySelector("#portfolio #row").innerHTML += tempalte;
        }
    });


// Modal

let modalText = document.getElementById("modal-text");

document.querySelector(".modal").onclick = function(){
    document.querySelector(".modal").classList.remove("fadein");
    document.querySelector(".modal").classList.add("fadeout");
}

document.querySelector(".modal").addEventListener("animationend", (ev) => {
    if (document.querySelector(".modal").classList.contains("fadeout")) {
        document.querySelector(".modal").style.display = "none";
        document.querySelector(".modal").classList.remove("fadeout");
    }
});

function openModal(element){
    document.getElementById("modal-image").src = element.src;
    document.querySelector(".modal").style.display = "flex";
    document.querySelector(".modal").classList.add("fadein");

    modalText.innerHTML = `<h2>${element.dataset.name}</h2>` + `<p>${element.dataset.desc}</p>`;
}

// TelegramBot getting Form data and sending to telegram

let form = document.querySelector("#contactForm");

let bot = {
    TOKEN: "5152336957:AAH5Gz_I77OJ3wYprtDZNJN2VhTrzGjDDxk",
    ChatID: "1340641273",
}
form.addEventListener("submit", e => {
    e.preventDefault();

    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    let phone = document.querySelector("#phone");
    let message = document.querySelector("#message");

    fetch(`https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.ChatID}&text=Vardas: ${name.value} %0A Elektroninis paštas: ${email.value} %0A Telefono numeris: %2B${phone.value} %0A Žinutė: ${message.value}`,{
        method: "GET"
    })

    .then(success => {
        alert("Pranešimas išsiusta sekmingai!")
    }), error =>{
        alert("Pranešimas būvo ne išsiustas sekminga!")
        console.log(error);
    }
})

// form disable submit

processFormData = function() {
    event.preventDefault();
};