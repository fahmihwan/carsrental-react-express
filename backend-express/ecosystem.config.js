module.exports = {
  apps: [
    {
      name: "carrental-backend",
      script: "index.js",
      instances: 1,
      exec_mode: "fork",
      watch: false,
    },
  ],
};
