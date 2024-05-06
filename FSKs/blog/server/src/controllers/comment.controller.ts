import { Request, Response } from 'express'
import Comment from '~/models/Comment'
import Post from '~/models/Post'

export const createComment = async (req: Request, res: Response) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body

    const post = await Post.findOne({ slug: slug })

    if (!post) {
      throw Error('Post was not found')
    }

    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser
    })

    const savedComment = await newComment.save()
    return res.json(savedComment)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const filter = req.query['searchKeyword']
    const where: any = {}
    if (filter) {
      where.desc = { $regex: filter, $options: 'i' }
    }

    const query = Comment.find(where)
    const page: number = !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1
    const pageSize: number = !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 10
    const skip = (page - 1) * pageSize
    const total = await Post.find(where).countDocuments()
    const pages = Math.ceil(total / pageSize)

    if (page > pages) {
      return res.json([])
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: 'user',
          select: ['avatar', 'name', 'verified']
        },
        {
          path: 'parent',
          populate: [
            {
              path: 'user',
              select: ['avatar', 'name']
            }
          ]
        },
        {
          path: 'replyOnUser',
          select: ['avatar', 'name']
        },
        {
          path: 'post',
          select: ['slug', 'title']
        }
      ])

      .sort({ updatedAt: 'desc' })

    return res.json({
      comments: result,
      config: {
        filter,
        totalCount: JSON.stringify(total),
        currentPage: JSON.stringify(page),
        pagesize: JSON.stringify(pageSize),
        totalPageCount: JSON.stringify(pages)
      }
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { desc, check } = req.body

    const comment = await Comment.findById(req.params.commentId)

    if (!comment) {
      throw Error('Comment was not found')
    }

    comment.desc = desc || comment.desc
    comment.check = typeof check !== 'undefined' ? check : comment.check

    const updatedComment = await comment.save()
    return res.json(updatedComment)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId)
    await Comment.deleteMany({ parent: comment?._id })

    if (!comment) {
      throw new Error('Comment was not found')
    }

    return res.json({
      message: 'Comment is deleted successfully'
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}
