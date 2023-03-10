import { Request, Response } from "express";
import { User } from "../entity/user.entity";

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        };
    }
};

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findOneBy({ id: parseInt(id) });

        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        };
    }
};

const createUser = async ({body}: Request, res: Response) => {
    const { firstname, lastname} = body;
    try {
        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
    
        await user.save();
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        };
    }
};

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findOneBy({ id: parseInt(id) });
        if (!user) return res.status(404).json({ message: "Not user found" });

        await User.update({ id: parseInt(id) }, req.body);

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        };
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await User.delete({ id: parseInt(id) });

        if (result.affected === 0)
        return res.status(404).json({ message: "User not found" });

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        };
    }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };