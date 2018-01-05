import server from "./DrawUtil";

import './css/style.css'
import _ from 'lodash';
server.render(window.location.href);

window.addEventListener('hashchange',()=> {
    server.render(window.location.href);
});

server.render(window.location.href);
document.getElementById("test2").addEventListener("click",  ()=> {
    window.location.hash = '#department_list';
});
document.getElementById("add_department").addEventListener('click',()=> {
    window.location.hash='#add_department';
});
document.getElementById("add_employee").addEventListener('click',  ()=> {
    window.location.hash="#add_employee";
});







