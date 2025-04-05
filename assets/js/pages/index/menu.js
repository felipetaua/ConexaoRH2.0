export const menu = document.querySelector(".hamburger");
    menu.onclick = function(){
        const navBar = document.querySelector(".nav-bar");
            navBar.classList.toggle("ativo");
            console.log("Menu clicado");
    }