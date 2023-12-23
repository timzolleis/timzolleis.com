import { texts } from '~/constants/texts'

export function initial() {
  return [{ title: texts.initial.title }]
}

export function about() {
  return [
    { title: texts.about.title },
    {
      title: texts.socials.twitter.title,
      description: texts.about.socials.twitter
    },
    { title: texts.socials.github.title, description: texts.about.socials.github }
  ]
}

export function help() {
  return [
    {
      title: texts.help.about.title,
      description: texts.help.about.description
    },
    {
      title: texts.help.projects.title,
      description: texts.help.projects.description
    }
  ]
}

export function unknown() {
  return [{ title: texts.unknown.title }]
}

export function github() {
  return [{ title: texts.socials.github.redirectText }]
}

export function twitter() {
  return [{ title: texts.socials.twitter.redirectText }]
}

export function rickRoll() {
  return [{ title: texts.rickroll }]
}

export function socials() {
  return [
    {
      title: texts.socials.twitter.title,
      description: texts.socials.twitter.link
    },
    { title: texts.socials.github.title, description: texts.socials.github.link }
  ]
}
