const employeesData = require('../employees.json');


// Controller function to get all employees with filters
function getAllEmployees(req, res) {
  let filteredEmployees = employeesData;

  // Filter employees based on query parameters
  if (req.query.page) {
    const page = parseInt(req.query.page);
    if (!page || page < 1) {
      return res.status(400).json({ code: 'bad_request', message: 'Invalid page number' });
    }

    const pageSize = 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    filteredEmployees = filteredEmployees.slice(startIndex, endIndex);
  }

  if (req.query.user === 'true') {
    filteredEmployees = filteredEmployees.filter((emp) => emp.privileges === 'user');
  }

  if (req.query.badges === 'black') {
    filteredEmployees = filteredEmployees.filter((emp) => emp.badges.includes('black'));
  }

  res.json(filteredEmployees);
}

// Controller function to get the oldest employee
function getOldestEmployee(req, res) {
  let oldestEmployee = employeesData[0]; // Assume the first employee is the oldest initially

  // Loop through the data to find the oldest employee
  for (const employee of employeesData) {
    if (employee.age > oldestEmployee.age) {
      oldestEmployee = employee;
    }
  }

  // Send the oldest employee as JSON response
  res.json(oldestEmployee);
}


// Controller function to get an employee by name
function getEmployeeByName(req, res) {
  const name = req.params.name; // Extract the name from the URL parameter
  const employee = employeesData.find((emp) => emp.name === name);

  if (!employee) {
    return res.status(404).json({ code: 'not_found' });
  }

  res.json(employee);
}

// Controller function to add a new employee
function addEmployee(req, res) {
  const newEmployee = req.body; // Extract the employee data from the request body

  // Validate that the new employee data has the same format as existing employees
  if (!isValidEmployee(newEmployee)) {
    return res.status(400).json({ code: 'bad_request', message: 'Invalid employee data format' });
  }

  // Add the new employee to the list (in-memory storage)
  employeesData.push(newEmployee);

  res.status(201).json({ code: 'success', message: 'Employee added successfully' }); // Respond with success status
}

// Function to validate the employee data format
function isValidEmployee(employee) {
  // Check if all required fields are present and have the correct types
  if (
    typeof employee.name !== 'string' ||
    typeof employee.age !== 'number' ||
    typeof employee.privileges !== 'string' ||
    !Array.isArray(employee.badges) ||
    !Array.isArray(employee.finished) ||
    !Array.isArray(employee.points) ||
    typeof employee.phone !== 'object' ||
    typeof employee.favorites !== 'object'
  ) {
    return false;
  }

  // You can add more specific validations for nested properties if needed
  if (
    typeof employee.phone.personal !== 'string' ||
    typeof employee.phone.work !== 'string' ||
    typeof employee.phone.ext !== 'string' ||
    typeof employee.favorites.food !== 'string' ||
    typeof employee.favorites.artist !== 'string'
  ) {
    return false;
  }

  return true;
}

module.exports = {
  getAllEmployees,
  getOldestEmployee,
  getEmployeeByName,
  addEmployee,
};