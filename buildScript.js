const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

let args = process.argv.slice(2);

switch (args[0]) {
  case "server":
    buildServer();
    break;
  case "frontend":
    buildFrontend();
    break;
  case "full":
    buildServer();
    buildFrontend();
    break;
  case "clear":
    clearBuild();
    break;
  default:
    buildServer();
    buildFrontend();
}

function buildServer() {
  exec("tsc", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}
function buildFrontend() {
  if (!fs.existsSync(path.join(__dirname, "build"))) {
    fs.mkdirSync(path.join(__dirname, "build"));
  }
  if (fs.existsSync(path.join(__dirname, "build", "frontend"))) {
    fs.rmdirSync(path.join(__dirname, "build", "frontend"), {
      recursive: true,
    });
  }
  frontendReactBuild();
}

function frontendReactBuild() {
  exec("cd frontend && npm run build", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

async function clearBuild() {
  if (fs.existsSync(path.join(__dirname, "build"))) {
    fs.rmdirSync(path.join(__dirname, "build"), { recursive: true });
  }
}
