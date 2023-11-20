# keysight coding challange
  this repo includes logic to parse root.prog file and lists the modules imported in it and also in the child modules 

## cli usage
you can install the package globaly and use cli tool to list the modules tree
default parsing path is the current directory 
```
npm install -g keysight-codingchallange

$ prog-parser 
```
or 

```
$ prog-parser ./path/to/root/prog/file   ./path/to/root/prog/folder
```

## package usage
you can install the package inside your packages and use the parser functionality to parse the root file programically