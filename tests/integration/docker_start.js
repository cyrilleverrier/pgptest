
var Docker = require('dockerode');

const startContainer = async (containerName) => {
  console.log("    Start docker container")

  docker = new Docker();
  container = await docker.createContainer({
    name: containerName,
    Image: 'timescale/timescaledb',
    Env: [
      'POSTGRES_USER=postgres',
      'POSTGRES_PASSWORD=password',
    ],
    ExposedPorts: { '5432/tcp': {} },
    HostConfig: {
      PortBindings: {
        "5432/tcp": [
          {
            HostPort: "5432"
          }
        ]
      }
    }
  });
  await container.start();
  console.log(`    ${containerName} docker container is started`);
}

exports.startContainer = startContainer