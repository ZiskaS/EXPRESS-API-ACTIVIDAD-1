const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees.controller');

// Route to GET all employees with filters
router.get('/employees', employeesController.getAllEmployees);

// Route to get the oldest employee
router.get('/employees/oldest', employeesController.getOldestEmployee);

// Route to get an employee by name
router.get('/employees/:name', employeesController.getEmployeeByName);

// Route to add a new employee
router.post('/employees', employeesController.addEmployee);

module.exports = router;

