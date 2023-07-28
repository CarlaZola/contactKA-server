import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error initializing data source:", err);
  });

  app.listen(3000, () => {
    console.log("Servidor executando na porta 3000");
  });
})();
