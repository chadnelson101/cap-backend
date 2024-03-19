import { getUsers,getUser,createUser,updatedUser,deleteUser} from '../models/users.js';
import bcrypt from 'bcrypt'

export default {
    getAllUsers: async (req, res) => {
        try{
        res.send(await getUsers())
        }catch (error){
            console.error('Error fetching users', error);
            res.status(500).send("Error fetching users");
        }
    },
    getSingleUser: async (req, res) => {
        const userid = +req.params.id;
        try{
            const user = await getUser(userid);
            res.send(user);
        }catch (error){
            console.error('Error fetching user', error);
            res.status(404).send("Error fetching user");
        }
    },
    addNewUser: async (req, res) => {
        const { firstname, lastname, age, gender, email, role, password } = req.body;
    
        // Hashers the password
        bcrypt.hash(password, 10, (err, hash) => {
            // Create user with hashed password
            createUser(firstname, lastname, age, gender, email, role, hash)
                .then(() => {
                    res.send({
                        msg: 'You have successfully created an account'
                    });
                })
                .catch(error => {
                    console.error('Error creating an account:', error);
                    res.status(500).send('Error creating an account');
                });
        });
    },
    editUser: async (req, res) => {
        try {
            const [user] = await getUsers(+req.params.id);
            const {firstname,lastname,age,gender,email,role,password} = req.body;
    
            const updatedFirstName = firstname || user.firstname;
            const updatedLastName = lastname || user.lastname;
            const updatedAge = age|| user.age;
            const updatedGender = gender || user.gender;
            const updatedEmail = email || user.email;
            const updatedRole = role || user.role;
            const updatedPassword = password || user.password;
    
            await updatedUser(updatedFirstName,updatedLastName, updatedAge,updatedGender,updatedEmail,updatedRole,updatedPassword, +req.params.id);
            res.send(await getUsers());
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(404).json({ error: 'Error updating user'});
        }
        },
        deleteUser: async (req, res) => {
            try {
                const userId = req.params.id;
                await deleteUser(userId);
                const users = await getUsers();
                
                res.send({ message: 'user deleted successfully', users });
            } catch (err) {
                console.error('Error deleting user:', err);
                res.status(404).json({ error: 'Error deleting user' });
            }
        },
        loginUser: async(req, res) =>{

        }
}