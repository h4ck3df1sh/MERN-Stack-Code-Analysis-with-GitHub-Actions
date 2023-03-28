import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  imagePost: [{ type: String }],
  sentiment: { type: Number, min: 1 , max: 5 , default: 5},
}, {
  timestamps: true,
  toObject: { getters: true },
  toJSON: { getters: true },
})

postSchema.virtual('likesCount').get(function () { return this.likes.length })
postSchema.virtual('commentsCount').get(function () { return this.comments.length })

const postModel = model('Post', postSchema);

export default postModel;
