
const {startContainer} = require('./docker_start.js');
const {stopDockerContainers} = require('./docker_stop.js');
const {isContainerRunning} = require('./docker_is_running.js');

module.exports = async () => {
    console.log('\nSetup Integration tests')
    const name = 'integration_tests';
    
    if (process.env.RESTART_DOCKER == 'true' || ! await isContainerRunning(name)) {
        await stopDockerContainers(name);
        await startContainer(name);
    } else {
        console.log(`    ${name} docker container already started`);
    }
}
