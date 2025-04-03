const fs = require('fs').promises;
const path = require('path');
const {getSupportedLocales} = require("./dist/repositories/utils/languages.js")
async function generateStaticData() {
  const repositoriesPath = path.join(__dirname, 'dist', 'repositories');
  const publicPath = path.join(__dirname, '../public');
  const locales = ["en"]// await getSupportedLocales();
  console.log("locales are")
  console.log(locales)
  try {
    const repositoryFolders = await fs.readdir(repositoriesPath, {
      withFileTypes: true,
    });

    for (const folder of repositoryFolders) {
      if (folder.isDirectory()) {
        const folderName = folder.name;
        if(folderName === "utils") {
          continue;
        }
        const requestFilePath = path.join(
          repositoriesPath,
          folderName,
          'request.js'
        );

        try {
          // Dynamically import the request.js file
          const requestModule = await import(
            `file://${requestFilePath}`
          );

          // Assuming the exported function is the only one in request.ts, or you know its name
          const exports = Object.values(requestModule);
          
          const theRequestFunctions = exports.filter(x => typeof x === "function" && x.name !== "getAllSlugs");
          const theSlugsFunction = exports.filter(x => typeof x === "function" && x.name === "getAllSlugs")[0];
          console.log(`all request functions in ${folderName} are:`)
          console.log(theRequestFunctions)
          if(!theSlugsFunction)
          {
            console.log("ERROR: All request functions must have a 'getAllSlugs' function")
            continue;
          }
          const slugs = await theSlugsFunction();
          console.log(theRequestFunctions)
          for(const requestFunction of theRequestFunctions) {
            if(!requestFunction)
            {
              console.log(`${folderName} has a null function`)
              continue;
            }
            
            for (const locale of locales) {
              for (const slug of slugs) {
                // Execute the request function
                console.log(`attempting to call request ${requestFunction.name} for locale ${locale} for slug ${slug}`)
  
                const data = await requestFunction(slug,locale);
  
                // Write the data to a JSON file in the public folder
                console.log("writing the data")
                console.log(data);
                const jsonFilePath = path.join(publicPath, `${folderName}_${locale}_${slug}.json`);
                await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
  
                console.log(`Generated ${folderName}.json`);
              }
            }
          }
          
        } catch (error) {
          console.error(`Error processing ${folderName}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading repositories directory:', error);
  }
}

generateStaticData();