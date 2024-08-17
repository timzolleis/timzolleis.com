import { z } from 'zod'

const redirectResultSchema = z.object({
  type: z.literal('redirect'),
  url: z.string()
})

type RedirectResult = z.infer<typeof redirectResultSchema>
export function isRedirectResult(result: unknown): result is RedirectResult {
  const parseResult = redirectResultSchema.safeParse(result)
  return parseResult.success
}
