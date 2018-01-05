import validator from './validation'

let map = {
    '#department_list': 'department',
    '#employee_list': 'employee',
    '#add_employee': 'employee',
    '#add_department': 'department',
};
let actions = {
    '#department_list': 'show',
    '#add_department': 'update',
    '#employee_list': 'show',
    '#add_employee': 'update'
};

class Server {

//Function for detecting correct hash of url
    static decodeURL(url) {
        let key;
        if (url.indexOf('#') >= 0) {
            key = url.indexOf('?') >= 0 ? url.substring(url.indexOf('#'), url.indexOf('?')) : url.substring(url.indexOf('#'));
        } else {
            window.location.href = "initialtask.com#department_list";
        }
        return key;
    }

    // Function for creating query into Spring MVC controller
    static getQuery(url) {
        let query;
        if (url.indexOf('#' >= 0)) {
            query = url.substring(url.indexOf('#') + 1);
        } else {
            query = "department_list";
        }
        return query;
    }

    //Router function
     render(url) {
        let key = Server.decodeURL(url);
        let query = Server.getQuery(url);
        server.mainFunction(query, map[key], actions[key]);
    }
    //Function which takes responsibility for printing all elements from GET request
    mainFunction(url, type, action) {
        fetch(url)
            .then(res => res.json())
            .then(out => {
                if (action === 'update' && type === 'department') {
                    this.printDepartmentForm(out);
                } else if (action === 'update' && type === 'employee') {
                    this.printEmployeeForm(out);
                }
                else {
                    this.printEntitiesTable(out, type);
                }
            })
            .catch(err => {
                throw err
            });
    }

    //edit button template
    printEditButton(value, type) {
        let editButtonCell = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.className = "manage-button2";
        editButtonCell.appendChild(editButton);
        let url = "add_" + type + '?id=' + value.id;
        editButton.addEventListener('click',  ()=> {
            window.location.hash = "#add_" + type;
            server.mainFunction(url, type, 'update');
        });
        return editButtonCell;
    }

    //delete button template
    printDeleteButton(value, type) {
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "manage-button2";
        let url = 'delete_' + type;
        deleteButton.addEventListener('click', ()=> {
            server.deleteEntity(url, value.id);
            document.getElementsByTagName("tbody")[0].removeChild(document.getElementById(type + value.id));
        });
        let deleteFormCell = document.createElement("td");
        deleteFormCell.appendChild(deleteButton);

        return deleteFormCell;
    }

    //employee list button template
    printEmployeeListButton(value) {
        let employeeListCell = document.createElement("td");
        let displayEmployeeList = document.createElement("button");
        displayEmployeeList.innerHTML = "Employee list";
        displayEmployeeList.className = "manage-button2";
        displayEmployeeList.value = value.id;
        displayEmployeeList.setAttribute("id", "employee-button");
        displayEmployeeList.addEventListener('click', ()=> {
            window.location.hash = '#employee_list?id=' + value.id;
        });
        employeeListCell.appendChild(displayEmployeeList);
        return employeeListCell;
    }

    //function which prints array of objects object to View
    printEntitiesTable(result, type) {
        let body = document.getElementsByClassName("content")[0];
        // creates a <table> element and a <tbody> element
        this.containerCleaner('content');
        let tbl = document.createElement("table");
        tbl.className = "entity-table";
        let tblBody = document.createElement("tbody");
        tbl.setAttribute("id", "entity-table");
        for (let i = 0; i < result.length; i++) {

            tblBody.appendChild(server.printSeparateElement(result[i], type));
        }
        tbl.appendChild(tblBody);
        body.appendChild(tbl);

    }

    //Function which parses json object to table column
    printSeparateElement(value, type) {
        let row = document.createElement("tr");
        row.setAttribute("id", type + value.id);
        for (let key in value) {
            if (value.hasOwnProperty(key)) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(value[key]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }
        row.appendChild(this.printEditButton(value, type));
        if (type === 'department')
            row.appendChild(this.printEmployeeListButton(value));
        row.appendChild(this.printDeleteButton(value, type));
        return row;
    }

//function which removes objects from db
    deleteEntity(url, id) {
        fetch(url + '/' + id,
            {method: 'DELETE'})
            .then(
                res => console.log('success')
            )
            .catch(err => cosole.error(err))
    }

    //template for input unit
     createInputFunction(name, type, value, placeholder) {
        let input = document.createElement("input");
        input.type = type;
        if (value !== null)
            input.value = value;
        input.name = name;
        input.placeholder=placeholder;
        return input;
    }

    //function which prints form for add or update employee
    printEmployeeForm(value) {
        this.containerCleaner('content');
        let body = document.getElementsByClassName("content")[0];
        let div = document.createElement("div");
        div.className = "emp-form2";
        let form = document.createElement("form");
        form.setAttribute("id", "employee-form");
        let input = this.createInputFunction('name', 'text', value.name,'Имя сотрудника');
        input.setAttribute("id", "employee-name");
        let inputId = this.createInputFunction('id', 'hidden', value.id);
        inputId.setAttribute("id", "id");
        let salaryInput = this.createInputFunction('salary', 'text', value.salary,'Зарплата');
        let departmentId = this.createInputFunction('departmentId', 'text', value.departmentId,"Департамент");
        let date = this.createInputFunction('birthDate', 'text', value.birthDate,"Дата рождения");
        let email = this.createInputFunction('email', 'text', value.email,"email");
        let button = document.createElement("button");
        button.type = 'submit';
        button.innerHTML = "Send";
        button.className = "btn";
        div.appendChild(form);
        form.appendChild(input);
        form.appendChild(inputId);
        form.appendChild(salaryInput);
        form.appendChild(date);
        form.appendChild(email);
        form.appendChild(departmentId);
        form.appendChild(button);
        body.appendChild(div);
        validator.validationEmployeeFunction();

    }

    //function which prints form for add or update department
    printDepartmentForm(value) {
        this.containerCleaner('content');
        let body = document.getElementsByClassName("content")[0];
        let div = document.createElement("div");
        div.className = "emp-form2";
        let form = document.createElement("form");
        form.setAttribute("id", "department-form");
        let input = this.createInputFunction('name', 'text', value.name,'Название департамента');
        input.setAttribute("id", "department-name");
        let inputId = this.createInputFunction('id', 'hidden', value.id);
        inputId.setAttribute("id", "id");
        let button = document.createElement("button");
        button.type = 'submit';
        button.innerHTML = "Send";
        button.className = "btn";

        div.appendChild(form);
        form.appendChild(input);
        form.appendChild(inputId);
        form.appendChild(button);
        body.appendChild(div);
        validator.validationDepartmentFunction();

    }




    //Function which creates JSON object from form
    toJsonString(form) {
        const obj = {};
        for (let i = 0; i < form.elements.length - 1; i++) {
            let element = form.elements[i];
            let name = element.name;
            let value = element.value;
            if (name) {
                obj[name] = value;
            }
        }
        return JSON.stringify(obj);
    }

    //Function which clear elements by class-name
    containerCleaner(blockName) {
        if (document.getElementsByClassName(blockName)) {
            document.getElementsByClassName(blockName)[0].innerHTML = "";
        }
    }



//Function for notification users about successes on wrong actions
    createMessageAlert() {
        let div = document.createElement('div');
        div.className = 'alert-message';
        let message = document.createElement('h2');
        message.innerHTML = "Object has been added to department list!";
        div.appendChild(message);
        return div;
    }

//Remove container by class-name
    removeContainer(containerName) {
        let container = document.getElementsByClassName(containerName)[0];
        container.parentNode.removeChild(container);
    }

    //Function for inserting object to DB
    insertObject(url, object, type) {
        fetch(url, {
            method: 'POST',
            body: object,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((out) => {
            document.getElementsByClassName('container')[0].appendChild(server.createMessageAlert());
            setTimeout( ()=> {
                server.removeContainer('alert-message');
            }, 2000);
            if (type === 'department') {
                window.location.href = "initialtask.com#department_list";
            } else {
                window.location.href = "initialtask.com#employee_list?id=" + out.departmentId;
            }
        }).catch(err => console.log(err))
    }


}

//Class which would be used in the top js file

let server = new Server();
export default  server;

