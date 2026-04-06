import { z } from 'zod'

export const createGroupSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(500).optional(),
    avatar: z.string().url().optional(),
})

export const joinGroupSchema = z.object({
    groupId: z.string(),
})

export const joinTournamentSchema = z.object({
    tournamentId: z.string(),
})
