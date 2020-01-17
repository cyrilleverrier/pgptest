
var Docker = require('dockerode');

const stopDockerContainers = async (containerName) => {
  docker = new Docker();
  var containers = await docker.listContainers({ all: true });
  containers.forEach(async info => {
    var container = docker.getContainer(info.Id);
    if (info.Names.includes(`/${containerName}`)) {
      if (info.State === "running") {
        try {
          console.log(`    Stop docker container: ${info.Names}`)
          await container.stop();
        } catch(error) {
          console.log(`    Failed to stop docker container: ${error}`)
        }
      }
      try {
        console.log(`    remove docker container: ${info.Names}`)
        await container.remove();
      } catch(error) {
        console.log(`    Failed to remove docker container: ${error}`)
      }
    }
  });
}

exports.stopDockerContainers = stopDockerContainers
