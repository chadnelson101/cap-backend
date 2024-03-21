import {pool} from '../config/config.js'

const getUsers = async () => {
    const [users] = await pool.query(`SELECT * FROM users`)
    return users
}

const getUser = async (userid) => {
    const [users] = await pool.query(`SELECT * FROM users where userid =?`,[userid])
    return users
}

const createUser = async (firstname,lastname,age,gender,email,role,password) =>{
    const [user] = await pool.query(`INSERT INTO users (firstname,lastname,age,gender,email,role,password) VALUES (?,?,?,?,?,?,?)`
    ,[firstname,lastname,age,gender,email,role,password])
    return user
}

const updatedUser = async (firstname, lastname, age, gender, email, role, password, userid) => {
     await pool.query(
        `UPDATE users SET firstname = ?, lastname = ?, age = ?, gender = ?, email = ?, role = ?, password = ? WHERE userid = ?`,
        [firstname, lastname, age, gender, email, role, password, userid]
        );
};

const deleteUser = async (userid) => {
    await pool.query(`DELETE FROM users WHERE userid = ?`, [userid]);



    return getUsers();
};

// const checkuser = async (email)=>{
//     const [[{password}]] = await pool.query(`SELECT * FROM users WHERE email =?`,[email])
//     return password
// }
const check = async (email) => {
    try {
        const [validate] = await pool.query(`SELECT userid, password FROM users WHERE email = ?`, [email]);
        if (validate.length > 0) {
            const { userid, password } = validate[0]; // Extract userId from the query result
            return { userId: userid, hashedPassword: password }; // Return userId along with hashedPassword
        } else {
            return null; // Return null if user is not found
        }
    } catch (error) {
        console.error('Error checking user:', error);
        throw new Error('Internal server error');
    }
};


const getUserByEmail = async (email) => {
    try {
        const [user] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
        return user;
    } catch (error) {
        console.error('Error retrieving user by email:', error);
        throw error; // Propagate the error
    }
};


export{getUsers,getUser,createUser,updatedUser,deleteUser,check,getUserByEmail}