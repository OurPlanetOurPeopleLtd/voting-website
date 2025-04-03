const fs = require('fs').promises;
const path = require('path');
const {getSupportedLocales} = require("./dist/repositories/utils/languages.js")
async function generateStaticData() {
  const repositoriesPath = path.join(__dirname, 'dist', 'repositories');
  const publicDataPath = path.join(__dirname, '../public', 'data'); // Changed to /public/data

  const locales =  await getSupportedLocales();
  console.log("----------------------")
  console.log("All the locales are:")
  locales.forEach(l => console.log(`-${l}`))
  console.log("----------------------")
  try {
    // Create the /public/data directory if it doesn't exist
    await fs.mkdir(publicDataPath, { recursive: true });
    
    const repositoryFolders = await fs.readdir(repositoriesPath, {
      withFileTypes: true,
    });

    console.log("----------------------")
    console.log(`All folders are:`)
    repositoryFolders.forEach(folder => console.log(`-${folder.name}`));
    console.log("----------------------")
    
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
          
          const theRequestFunctions = exports.filter(x => typeof x === "function" && x.name !== "getAllSlugs" && x.name !== "getAllItems");
          const theSlugsFunction = exports.filter(x => typeof x === "function" && x.name === "getAllSlugs")[0];
          console.log(`all request functions in ${folderName} are:`)
          console.log(theRequestFunctions)
          if(!theSlugsFunction)
          {
            console.error(`ERROR: All request functions must have a 'getAllSlugs' function`)
            console.error(`!!!!! ${folderName} is missing a getAllSlugs function !!!!`)
            continue;
          }
          const slugs = await theSlugsFunction();

          console.log("----------------------")
          console.log(`All slugs for ${folderName} are: `)
          slugs.forEach(slug => console.log(`-${slug}`)); 
          console.log("----------------------")
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
  
                const data = await requestFunction(slug,locale,false);
  
                // Write the data to a JSON file in the public folder
                console.log("writing the data")       
                const finalSlug = (!slug || slug) === "undefined" ? "" : slug ?? "";
                const jsonFilePath = path.join(publicDataPath, `${folderName}_${locale}_${finalSlug}.json`);
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