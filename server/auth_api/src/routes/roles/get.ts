import { Response } from '@topography/comm'
import { roleDataSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { Context } from '../..'

export const getRoles = async (ctx: Context) => {
	const roles = await ctx.prisma.role.findMany()
	return roles.map((role) => roleDataSchema.parse(role))
}

export type GetRolesResponse = Response<Awaited<ReturnType<typeof getRoles>>>

export const getRolesHandler = (
	ctx: Context
): RequestHandler<{}, GetRolesResponse> => {
	return async (_req, res) => {
		// TODO: authenticate request

		try {
			return res.send({ data: await getRoles(ctx) })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}