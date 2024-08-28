const mongoose = require("mongoose");
exports.insertData = async (collection, values) => {
    try {
      // Check for existing duplicates before inserting
      const existingDoc = await collection.findOne({ email: values.email });
      if (existingDoc) {
        return { status: false, msg: 'Email already exists', code: 400 };
      }

      const insData = await collection.create(values);
      if (!insData) {
        return { status: false, msg: 'Not inserted', code: 301 };
      }
      return { status: true, msg: insData, code: 200 };
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return { status: false, msg: errors,code:400 };  
      }
      if(error.code == 11000){
        const fieldNames = Object.keys(error.keyPattern);
        const duplicateFields = fieldNames.map(fieldName => {
            return `${fieldName} ${error.keyValue[fieldName]} is already taken`;
        });
        return { status: false, msg: duplicateFields.join(''),code:400 };  
      }
      return { status: false, msg: error.message,code:500 };
    }
  };
