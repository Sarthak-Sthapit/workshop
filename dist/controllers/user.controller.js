const users = [
    {
        id: 1,
        name: "Sarthak Sthapit",
        email: "sarthaksthapit0@gmail.com",
    },
    {
<<<<<<< HEAD
        id: 2,
=======
        id: 2, 
>>>>>>> 006849f (Add files via upload)
        name: "Sakshyam Paneru",
        email: "sxm@gmail.com",
    },
    {
        id: 3,
        name: "Jove Sapkota",
        email: "sapkotajove69@gmail.com",
    },
];
export const getUsers = (req, res) => {
    return res.json({ users });
};
export const createUser = (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            throw new Error("credentials are required");
        }
        const newUser = { id: users.length + 1, name, email };
        if (!newUser) {
            throw new Error("User not found");
        }
        users.push(newUser);
        return res.status(201).json({
            new_user_created: newUser,
            users,
        });
    }
    catch (error) {
        console.log("error found", error);
    }
};
export const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).json({
            status: "failed",
            message: "user not found",
        });
    }
    return res.status(200).json({
        status: "success",
        message: "user found",
        user,
    });
};
export const deleteUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) {
        return res.status(400).json({
            status: "failed",
            message: "user id is required",
        });
    }
    const deletedUser = users.filter((user) => user.id !== userId);
    return res.status(200).json({
        status: "success",
        message: "user deleted",
        deletedUser,
    });
};
