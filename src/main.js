const express = require('express')
const fs = require('fs');

const app = express()

funnywords = [
    "0day",
    "java",
    "js",
    "exploit",
    "hack",
    "json",
    "virus",
    ".rar",
    ".zip",
    "free",
    "email",
    ".exe",
    "malware",
    ".mp4",
    ".sh",
    "downloader"
]
spaces = [
  "-",
  "_",
  "+"
]
app.get('/*', (req, res) => {
  if (req.url.startsWith("/req/")){
    res.send(savedata(req.url.replace("/req/", "")))
  }
  else {
    findValueByKey(filePath, req.url.replace("/", ""), (err, value) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect(value)
      }
    });
  }
})
function findValueByKey(filePath, keyToFind, callback) {
  // Read the existing JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(`Error reading file ${filePath}: ${err}`);
      return;
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Check if the key exists in the JSON data
      if (jsonData.hasOwnProperty(keyToFind)) {
        // Return the value corresponding to the key
        const value = jsonData[keyToFind];
        callback(null, value);
      } else {
        // Key not found
        callback(`Key "${keyToFind}" not found in ${filePath}`);
      }
    } catch (parseError) {
      callback(`Error parsing JSON in file ${filePath}: ${parseError}`);
    }
  });
}

function updateJsonFile(filePath, newKey, newValue) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}: ${err}`);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      jsonData[newKey] = newValue;

      const updatedJsonData = JSON.stringify(jsonData, null, 2);
      fs.writeFile(filePath, updatedJsonData, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file ${filePath}: ${err}`);
        } else {
          console.log(`Data has been updated and written to ${filePath}`);
        }
      });
    } catch (parseError) {
      console.error(`Error parsing JSON in file ${filePath}: ${parseError}`);
    }
  });
}

const filePath = 'data.json';
function getrandomnum(limit) {
  return Math.floor(Math.random()*limit)
}

function getrandomindex(array) {
  return array[getrandomnum(array.length)]
}
function savedata(funny) {
    newname = ""
    for (let i = 0; i < 7; i++) {
      newname += getrandomindex(funnywords)
      newname += getrandomindex(spaces)
    }
    updateJsonFile(filePath, newname, funny);
    return newname
  }
  

app.listen(3000)