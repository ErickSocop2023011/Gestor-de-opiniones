import Post from './post.model.js';
import Category from '../category/category.model.js';

export const createPost = async(req, res) =>{
    try {
        const {usuario} = req
        const data = req.body

        data.auth = usuario._id

        const categoria = Category.findById(data.category)

        if (!categoria) {
            return res.status(400).json({
                succes: false,
                message: "the category does not exist"
            })
        }

        const post = await Post.create(data);

        return res.status(201).json({
            message: "Post has been created",
            post: post
        });
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error creating post"
        })
    }
}

export const deletePost = async (req, res) =>{
    try{
    const { usuario } = req;
    const {pid} = req.params;

    const post = await Post.findById(pid);

    if(usuario._id.toString() !== post.creator.toString()){
        return res.status(400).json({
            success: false,
            msg: "You can't edit this post"
        });
    }

    const updatePost = await Post.findByIdAndUpdate(pid, { status: false }, {new: true});

    res.status(200).json({
        success: true,
        msg: 'Deleted post',
        user: updatePost,
    });
    }catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error deleting post',
            error: err.message
        });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { usuario } = req;
        const data = req.body;
        const { pid } = req.params;

        const post = await Post.findById(pid);

        if (usuario._id.toString() !== post.creator.toString()) {
            return res.status(400).json({
                success: false,
                msg: "You can't update this post"
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(pid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Updated Post',
            user: updatedPost,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error updating post',
            error: err.message
        });
    }
}