import { Request, Response } from 'express'
import Post from '~/models/Post'
import PostCategories from '~/models/PostCategories'

export const createPostCategory = async (req: Request, res: Response) => {
  try {
    const { title } = req.body

    const postCategory = await PostCategories.findOne({
      title
    })

    if (postCategory) {
      throw Error('Category is already created!')
    }

    const newPostCategory = new PostCategories({
      title
    })

    const savedPostCategory = await newPostCategory.save()

    return res.status(201).json(savedPostCategory)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const getSingleCategory = async (req: Request, res: Response) => {
  try {
    const postCategory = await PostCategories.findById(req.params.postCategoryId)

    if (!postCategory) {
      throw Error('Category was not found!')
    }

    return res.json(postCategory)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const getAllPostCategories = async (req: Request, res: Response) => {
  try {
    const filter = req.query['searchKeyword']
    const where: any = {}
    if (filter) {
      where.email = { $regex: filter, $options: 'i' }
    }

    const query = PostCategories.find(where)
    const page: number = !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1
    const pageSize: number = !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 10
    const skip = (page - 1) * pageSize
    const total = await PostCategories.find(where).countDocuments()
    const pages = Math.ceil(total / pageSize)

    if (page > pages) {
      return res.json([])
    }
    const result = await query.skip(skip).limit(pageSize).sort({ updatedAt: 'desc' })

    return res.json({
      categories: result,
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

export const updatePostCategory = async (req: Request, res: Response) => {
  try {
    const { title } = req.body

    const postCategory = await PostCategories.findByIdAndUpdate(
      req.params.postCategoryId,
      {
        title
      },
      {
        new: true
      }
    )

    if (!postCategory) {
      throw Error('Category was not found')
    }

    return res.json(postCategory)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

export const deletePostCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.postCategoryId

    await Post.updateMany({ categories: { $in: [categoryId] } }, { $pull: { categories: categoryId } })

    await PostCategories.deleteOne({ _id: categoryId })

    res.send({
      message: 'Post category is successfully deleted!'
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}
