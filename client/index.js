import Dashboard from "./pages/Dashboard.js"
import Products from "./pages/Products.js";
import Posts from "./pages/Posts.js";
import NotFound from "./pages/NotFound.js";

// VARIABLES
let title;

// SELECT
//1.sidebar
const sidebarToggleBtn = document.querySelector(".layout__toggle-sidebar");
const layoutSidebar = document.querySelector(".layout__sidebar");
const logoTitle = document.querySelector(".logo__title");
const sidebarNav = document.querySelector(".sidebar__nav");
const navList = document.querySelector(".nav__list");
const navItem = document.querySelectorAll(".nav__item");
const navLinkText = document.querySelectorAll(".nav__link__text");


// EVENTS
//1.sidebar
sidebarToggleBtn.addEventListener("click", toggleSidebar);
//2.router
document.addEventListener("DOMContentLoaded",()=>{

    document.body.addEventListener("click",(e)=>{
        if(e.target.hasAttribute('data-link') || e.target.closest('.nav__item')){
            e.preventDefault();
            const href = e.target.href|| e.target.closest('.nav__item').querySelector('[data-link]').getAttribute('href');
            
            if(href === "/") title = "SPA - داشبورد";
            if(href === "products") title = "SPA - محصولات";
            if(href === "posts") title = "SPA - پست ها";

            navigate(title, href);
        }
    })

    router();
})
window.addEventListener("popstate", router)

// FUNCTIONS
//1.sidebar
function toggleSidebar(){
    sidebarToggleBtn.classList.toggle("close-sidebar");
    layoutSidebar.classList.toggle("sidebar--width");
    logoTitle.classList.toggle("logo__title--change");
    sidebarNav.classList.toggle("sidebar__nav--flex");
    navList.classList.toggle("nav__list--gap");
    navItem.forEach(item => item.classList.toggle("nav__item-center"));
    navLinkText.forEach(item => item.classList.toggle("link--show"));
}

//2.route
function router(){
    const routes=[
        {path: "/", view: Dashboard},
        {path: "/products", view: Products},
        {path: "/posts", view: Posts},
    ];

    const potentialRoutes = routes.map(item => {
        return{
            route: item,
            isMatch: location.pathname === item.path,
        }
    });
    
    let match = potentialRoutes.find(route => route.isMatch);

    if(!match){
        match={
            route: { path: "/not-found", view: NotFound}, isMatch:true
        }
    }

    document.querySelector(".layout__main").innerHTML = match.route.view();
}

function navigate(title,url){
    history.pushState(null, null, url);
    document.title = title;
    router();
}