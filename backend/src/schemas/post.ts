import { z } from 'zod'

export const createPostSchema = z.object({
    content: z.string().min(1).max(2000),
    image: z.string().url().optional().or(z.string().length(0)),
    groupId: z.string().optional(),
})

export const createCommentSchema = z.object({
    content: z.string().min(1).max(500),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type CreateCommentInput = z.infer<typeof createCommentSchema>
