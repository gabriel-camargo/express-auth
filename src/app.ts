import "colors"
import server from "./server"

server.app.listen(server.port, () =>
  console.log(
    ` 📡 Backend server: `.inverse.yellow.bold +
      ` Running in ${server.mode} mode on port ${server.port} hahaha lesgooo`
  )
);