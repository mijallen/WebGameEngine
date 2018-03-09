# WebGameEngine
A Node.js web server for writing TypeScript which interacts with WebGL

The code in this repository is a work in progress (obviously).

## Project Goal:
My intention for this project is to create a web-based environment for developing 3D games. 
With the use of TypeScript, users can write code with helpful type checking and more familiar 
object-oriented concepts (like inhertance and interfaces) which still makes use of HTML5 and WebGL 
for an in-browser preview of the current game. 
The Node.js server will provide a set of services oriented towards game development, like an IDE 
within the browser for writing TypeScript, content managers for various game media (images, 3D models, 
shaders, sounds, levels, and possibly more), and version control support. 
Ideally, once your game has been satisfactorily built, there would also be a means of publishing 
to popular platforms beyond HTML5 (like Windows, Mac, Linux, iOS, and Android).

## Development Environment:
* Windows 7 Home Premium Service Pack 1
* Node.js version 4.4.3
* Node Package Manager version 2.15.1
* Express.js version 4.13.4
* TypeScript Compiler version 1.8.10
* Angular version 1.5.5
* Firefox version 47.0

## Base System:
* Node.js server to serve static files/scripts and host Express REST services
* REST services to load/save a TypeScript script and compile it
* Angular REST client that allows editing and recompiling TypeScript script
* A preview of the most recently published changes
* JavaScript WebGL abstractions for vertex buffers and shader programs
* TypeScript declaration files to provide interaction/typing with WebGL abstractions

## Planned Features:
* TypeScript engine classes to expose more helpful functionality to user scripts
* Ability to add and remove user scripts for better code organization
* Login system for users so that the server admin can invite people to work on the game
* Better security to contain the game preview and prevent AJAX or form POSTs from spoofing user
* Menu system to navigate between code editing, content managers, and settings
* 3D object viewer with tools for uploading, surface normals, UV texture coordinates, and hopefully more
* Image and Sound previewers with tools for uploading, filtering, and hopefully more
* Level editor with ability to construct level, add objects, preview, and hopefully more
* GLSL shader editor with regex parsing for attribute, uniform, and varying variables
* Version control and visual diffs for user scripts, levels, and ideally game media
* A live chat or forum system for discussing game development with team
* If possible, a way to write and host game servers for multi-player games

## Current Image/Texture Handling:
A utility, tga2bintex has been added to the utilities/ folder.
It is a standalone executable which just requires a C++ compiler to build.
Try adding a TGA file to the media/images/ folder then running tga2bintex on it.
This should generate a BINTEX file in the same folder that can be used by the MediaLoader class.
