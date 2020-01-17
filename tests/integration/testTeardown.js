const { stopDockerContainers } = require('./docker_stop.js');

module.exports = async () => {
    console.log('\nTeardown Integration tests')
    if (process.env.RESTART_DOCKER == 'true') {
        await stopDockerContainers('integration_tests');
    }
    console.log('done');
}