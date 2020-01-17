
var Docker = require('dockerode');

const isContainerRunning = async (containerName) => {
  docker = new Docker();
  var containers = await docker.listContainers({ all: true });
  running = false;
  containers.forEach(async info => {
    if (info.Names.includes(`/${containerName}`)) {
      console.log(`    ${containerName} docker container is ${info.State}`);
      running = (info.State == "running");
      }
  });

  return running;
};

exports.isContainerRunning = isContainerRunning