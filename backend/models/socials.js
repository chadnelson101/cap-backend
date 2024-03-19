import {pool} from '../config/config.js'

const getPosts = async () =>{
    const [posts] = await pool.query(`SELECT * FROM socials`)
    return posts
}

const createPost = async (text,postimg) =>{
    const [posts] = await pool.query(`INSERT INTO socials (text,postimg) VALUES (?,?)`,[text,postimg])
    return posts
}

const deletePost = async (postid) => {
    await pool.query(`DELETE FROM socials WHERE postid =?`, [postid]);
    return getPosts();
};

const updatePost = async (text, postimg, postId) => {
    await pool.query(`UPDATE socials SET text = ?, postimg = ? WHERE postid = ?`,[text, postimg, postId]
    );
};



export {getPosts, deletePost, createPost, updatePost}