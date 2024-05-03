import { Request, Response } from 'express'
import Post from '~/models/Post'
import { v4 as uuidv4 } from 'uuid'

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = new Post({
      title: 'sample title',
      caption: 'sample caption',
      slug: uuidv4(),
      body: {
        type: 'doc',
        content: []
      },
      photo: '',
      user: req.user._id
    })
    const createdPost = await post.save()
    return res.json(createdPost)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const filter = req.query['searchKeyword']
    const where: any = {}
    if (filter) {
      where.email = { $regex: filter, $options: 'i' }
    }

    const query = Post.find(where)
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
        }
      ])
      .sort({ updatedAt: 'desc' })

    return res.json({
      posts: result,
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

export const deletedPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug })

    if (!post) {
      throw new Error('Post was not found')
    }

    return res.json({
      message: 'Post is successfully deleted'
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}
