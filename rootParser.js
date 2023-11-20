import logTree from "console-log-tree";
import fs from "fs";
import path from "path";
const importRegex = /import\s(.*);/i; // regexp to get the path string after import at the  start of the line

function fileImportGetter(file) {
  // making sure the file path is absolute
  const filePath = path.resolve(file) 
  const fileName = path.basename(filePath)
  // returning only file name if the file don't exists
  if(!fs.existsSync(filePath)) return {name: `${fileName} : (❌ file "${filePath}" don't exists"` ,children:[]} 
  // fastest dev way to load a file content , and it's safe if th)e file size is not big (which in production it may be !!!)
  const allFileContents = fs.readFileSync(filePath, "utf-8");

  // variable to store child module
  let childModules; 
  // trying to parse the files and list imported modules
  try{

    childModules = allFileContents.split(/\r?\n/).reduce((modules, line) => {
      const importedModule = line.match(importRegex);
      if (!importedModule) return modules;
      modules.push(
        fileImportGetter(path.join(path.dirname(filePath), importedModule[1]))
      );
      return modules;
      // add object with name and children for each import file
    }, []);
  }catch(e){
    return{
      name: `${fileName} : (❌  couldn't read file "${filePath}" properly."`,
      children:[]
    }
  }
  return {
    name:fileName,
    children:childModules
  }
}

export default fileImportGetter;
