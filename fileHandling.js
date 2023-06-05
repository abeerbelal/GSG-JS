import fs from 'fs';


export function readFile(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          try {
            console.log('Data:', data);
            const jsonData = JSON.parse(data);
            console.log('Parsed Data:', jsonData);
            resolve(jsonData);
          } catch (parseError) {
            console.error('Parse Error:', parseError);
            reject(parseError);
          }
        }
      });
    });
  }
  
  



// Function to write data to a file
export function writeFile(filename, data) {
    return new Promise((resolve, reject) => {
      const jsonData = JSON.stringify(data);
      fs.writeFile(filename, jsonData, 'utf8', (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }



  

  
