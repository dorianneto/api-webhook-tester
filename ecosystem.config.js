module.exports = {
  apps: [{
    name: "api-webhook-tester",
    script: "./src/server.js",
    instances: "max",
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
