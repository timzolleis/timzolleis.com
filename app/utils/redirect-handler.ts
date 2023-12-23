import { redirectTo } from '~/utils/redirectTo'

const links = {
  GITHUB: 'https://github.com/timzolleis',
  TWITTER: 'https://twitter.com/timzolleis'
}

export const linkHandler = {
  GITHUB: () => redirectTo(links.GITHUB),
  TWITTER: () => redirectTo(links.TWITTER)
}
