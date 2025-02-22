import {Schema, model} from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creator:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postPicture: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    commets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    status: {
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

postSchema.methods.toJSON = function(){
    const {_id, ...post} = this.toObject()
    post.pid = _id
    return post
}

export default model('Post', postSchema);