import { rolDaoMongo } from "../daos/mongodb/rol_dao.js";

export const initializeRoles = async () => {
  // Solo contamos con dos roles
  const roles = ["admin", "user"];

  for (const roleName of roles) {
    const existing = await rolDaoMongo.getByFilter({ name: roleName });
    if (!existing) {
      await rolDaoMongo.create({ name: roleName });
      console.log(`Rol '${roleName}' creado.`);
    } 
  }
};