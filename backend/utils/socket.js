let io;

const socket = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: "*",
      },
    });
  },
  get: () => {
    if (!io) {
      throw new Error("IO not instantiated");
    }
    return io;
  },
};

exports.socket = socket;
