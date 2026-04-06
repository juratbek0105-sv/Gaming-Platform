import { z } from 'zod'

export const updateProfileSchema = z.object({
    name: z.string().optional(),
    bio: z.string().max(160).optional(),
    location: z.string().optional(),
    team: z.string().optional(),
    role: z.string().optional(),
    avatar: z.string().url().optional().or(z.string().length(0)),
    cover: z.string().url().optional().or(z.string().length(0)),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
