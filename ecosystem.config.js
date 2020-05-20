module.exports = {
  apps: [{
    name: "api-webhook-tester",
    script: "./src/app.js",
    instances: "1",
    env: {
      NODE_ENV: "development",
      TZ: "utc"
    },
    env_development: {
      NODE_ENV: "production",
    }
  }]
}
