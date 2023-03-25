import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

commentSchema.virtual('likesCount').get(function () { return this.likes.length })

const commentModel = model('Comment', commentSchema);

export default commentModel;

//versionKey: false//