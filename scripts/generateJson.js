const fs = require('fs').promises;
const path = require('path');

async function generateStaticData() {
  const repositoriesPath = path.join(__dirname, '../src', 'repositories');
  const publicPath = path.join(__dirname, '../public');

  try {
    const repositoryFolders = await fs.readdir(repositoriesPath, {
      withFileTypes: true,
    });

    for (const folder of repositoryFolders) {
      if (folder.isDirectory()) {
        const folderName = folder.name;
        const requestFilePath = path.join(
          repositoriesPath,
          folderName,
          'request.ts'
        );

        try {
          // Dynamically import the request.ts file
          const requestModule = await import(
            `file://${requestFilePath}`
          );

          // Assuming the exported function is the only one in request.ts, or you know its name
          const requestFunction = Object.values(requestModule)[0];

          // Execute the request function
          console.log("attempting to call request")
          const data = await requestFunction();

          // Write the data to a JSON file in the public folder
          console.log("writing the data")
          const jsonFilePath = path.join(publicPath, `${folderName}.json`);
          await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));

          console.log(`Generated ${folderName}.json`);
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