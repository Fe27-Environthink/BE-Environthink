import Role from "../models/roleModel.js";
import path from "path";
import fs from "fs";

export const RoleController = {
  getRole: async (req, res) => {
    try {
      const response = await Role.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Role" });
    }
  },
  getRoleById: async (req, res) => {
    try {
      const response = await Role.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ error: "Role not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch Role" });
    }
  },
  createRole: async (req, res) => {
    const { role_id } = req.body;
    const { role } = req.body;
    

    try {
      const newRole = await Role.create({ role_id, role });
      res.json(newRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateRole: async (req, res) => {
    const { role_id } = req.body;
    const { role } = req.body;
    try {
      await Role.update({ role_id, role }, { where: { role_id } });
      res.json({ message: 'Role updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteRole: async (req, res) => {
    const { id } = req.params;
    try {
      await Role.destroy({ where: { role_id: id } });
      res.json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default RoleController;