import { Request, Response } from 'express'
import Post from '~/models/Post'
import { v4 as uuidv4 } from 'uuid'
import { uploadPicture } from '~/middleware/uploadPictureMiddleware'
import { fileRemover } from '~/utils/fileRemover'

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, caption } = req.body

    const post = new Post({
      title: title,
      caption: caption,
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
export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
    if (!post) {
      throw Error('Post was not found')
    }

    const handleUpdatePostData = async (data: string) => {
      const { title, caption, body, tags, categories } = JSON.parse(data)

      post.title = title || post.title
      post.caption = caption || post.caption
      post.body = body || post.body
      post.tags = tags || post.tags
      post.categories = categories || post.categories
      const updatedPost = await post.save()
      return res.json(updatedPost)
    }
    const upload = uploadPicture.single('postPicture')
    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({
          error: 'An unknown error occurred when uploading ' + err.message
        })
      } else {
        if (req.file) {
          const filename = post.photo
          if (filename) {
            fileRemover(filename)
          }
          post.photo = req.file.filename
          handleUpdatePostData(String(req.body.document))
        } else {
          const filename = post.photo
          post.photo = ''
          if (filename) {
            fileRemover(filename)
          }
          handleUpdatePostData(String(req.body.document))
        }
      }
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await (
      await Post.findOne({ slug: req.params.slug })
    )?.populate([
      {
        path: 'user',
        select: ['avatar', 'name']
      },
      {
        path: 'categories',
        select: ['title']
      },
      {
        path: 'comments',
        match: {
          check: true,
          parent: null
        },
        populate: [
          {
            path: 'user',
            select: ['avatar', 'name']
          },
          {
            path: 'replies',
            match: {
              check: true
            },
            populate: [
              {
                path: 'user',
                select: ['avatar', 'name']
              }
            ]
          }
        ]
      }
    ])

    if (!post) {
      throw Error('Post was not found')
    }
    return res.json(post)
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
        },
        {
          path: 'categories',
          select: ['title']
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
