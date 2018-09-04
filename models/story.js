var mongoose = require('mongoose')

const { LikeSchema } = require('./like')
const { CommentSchema } = require('./comment')
const { UserSchema } = require('./user')


const StorySchema = new mongoose.Schema({
    body: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    created: {
        type: mongoose.Schema.Types.Date
    },
    likes: [LikeSchema],
    comments: [CommentSchema],
    user: {
		type: UserSchema,
		required: true
	}
})

StorySchema.pre('save', function (next) {
    if (!this.created) {
        this.created = new Date
    }

    next()
})

const Story = mongoose.model('Story', StorySchema)
module.exports = {Story, StorySchema}


