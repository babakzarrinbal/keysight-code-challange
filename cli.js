#!/usr/bin/env node

import commandLineArgs from "command-line-args"; // for parsing cli args
import { marked } from "marked"; // for pretty print markdown
import { markedTerminal } from "marked-terminal"; // for pretty print in terminal
import logTree from "console-log-tree"; // for pretty logging of imported module tree
import fs from "fs";
import path from "path";
import rootParser from "./rootParser.js";

// options for arguments passed on to cli command
const optionDefinitions = [
  // showing help text
  { name: "help", alias: "h", type: Boolean },
  // source path either folders or the root.prog files
  {
    name: "src",
    type: String,
    multiple: true,
    defaultOption: true,
    defaultValue: ["./"],
  },
];
// parsing args passed from command line to options variable
const options = commandLineArgs(optionDefinitions);

//printing help text when help arg exists and exit process
if (options.help) {
  var str = fs.readFileSync("./help.md", "utf8");
  marked.use(markedTerminal());
  console.log(marked.parse(str));
  process.exit(0);
}

options.src.forEach((source) => {
  let sourcePath = path.resolve(source);
  console.log("\n"+"-".repeat(process.stdout.columns)+"\n" ); // line seperator for console
  
  if (!fs.statSync(sourcePath).isFile())
    sourcePath = path.join(sourcePath, "root.prog");

  if (!fs.existsSync(sourcePath))
    return console.log('❌ "', sourcePath, '" is not a valid path');

  if (
    path.basename(sourcePath).toLowerCase() !==
    "root.prog"
  )
    return console.log('❌ "', sourcePath, '" is not a root.prog file');

  // parsing a single root.prog file
  console.log("✔️ ", sourcePath);
  logTree.log(rootParser(sourcePath))
});
