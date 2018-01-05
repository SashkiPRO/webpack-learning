//import $ from 'jquery';
//import jqueryValidation from 'jquery-validation';
import server from './DrawUtil'
class Validator {
    //JQuery validation for department form
    validationDepartmentFunction() {
        $("#department-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 16,
                    remote: {
                        url: 'check_name',
                        data: {"name": $(this).name, "id": $("#id").val()},
                        type: 'POST'
                    }
                }
            },
            submitHandler:  (form, event)=> {
                event.preventDefault();
                server.insertObject("/update_department", server.toJsonString(form), 'department');
            }

        });
    }

    //JQuery validation for employee form
    validationEmployeeFunction() {
        $("#employee-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 20
                },
                salary: {
                    required: true,
                    number: true,
                },
                email: {
                    required: true,
                    email: true,
                    remote: {
                        url: 'check_email',
                        data: {"email": $(this).email, "id": $("#id").val()},
                        type: 'POST'
                    }
                },
                birthDate: {
                    date: true,
                    dateISO: true,
                    required: true
                }
            },
            submitHandler(form, event) {
                event.preventDefault();
                server.insertObject("/update_employee", server.toJsonString(form), 'employee');
            }

        });
    }
}

const validator = new Validator();
export default validator;