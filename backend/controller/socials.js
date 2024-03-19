import {getPosts, deletePost, createPost, updatePost} from '../models/socials.js'

export default {
    getPost: async (req, res) => {
        try{
        res.send(await getPosts())
        }catch (error){
            console.error('Error fetching posts', error);
            res.status(404).send("Error fetching posts");
        }
    },
    createPost: async (req, res) => {
        try {
            const { text, postimg } = req.body;
            await createPost(text, postimg);
            const posts = await getPosts(); // Fetch the updated posts
            res.send({ 
                msg: 'Post added',
                posts: posts // Send the updated posts
            });
        } catch (error) {
            console.error('Error adding post', error);
            res.status(500).send("Error adding post");
        }
    },
    deletePost: async (req, res) => {
        try {
            const postid = req.params.id;
            await deletePost(postid);
            const posts = await getPosts();
            res.send({ msg: 'Post deleted successfully', posts });
        } catch (err) {
            console.error('Error deleting post:', err);
            res.status(404).json({ error: 'Error deleting post' });
        }
    },
    updatePost: async (req, res) => {
        try {
            const [post] = await getPosts(+req.params.id);
            const { text, postimg } = req.body;
    
            const updatedText = text || post.text;
            const updatedPostimg = postimg || post.postimg;
    
            await updatePost(updatedText, updatedPostimg, req.params.id); // Fix concatenation issue here
            const updatedPosts = await getPosts();
            res.send({
                msg: 'Post updated',
                posts: updatedPosts
            });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(404).json({ error: 'Error updating post' });
        }
    }
}
    