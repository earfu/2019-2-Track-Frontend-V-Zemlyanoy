module.exports = {
  launch: {
    headless: true, // для отображения в клиенте
  },
  server: {
    command: `npm start`,
    port: 3000,
    launchTimeout: 40000,
    debug: true,
  },
};
