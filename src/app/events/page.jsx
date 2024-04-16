import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { clickHere } from '@/components/SocialIcons'

function ClickLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        target="_blank"
        className="group flex font-medium text-teal-600 transition hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-200"
      >
        <Icon className="mt-1 h-6 w-6 flex-none fill-teal-600 transition group-hover:fill-teal-500" />
        <span className="ml-2">{children}</span>
      </Link>
    </li>
  )
}

export const metadata = {
  title: 'Events',
  description: 'Upcoming events',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16">
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            News
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Some of your Vaughn East neighbors are having fun working on the
              hay bale and if you’d like to join in on the fun, please contact
              the HOA board. We always welcome the help!
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col items-center">
        <h2 className="self-start text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          Events
        </h2>
        <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
          <div className="flex flex-row items-center gap-4">
            <p>Click to see the events in Pike Road</p>
            <ClickLink
              href="https://www.pikeroad.us/events"
              icon={clickHere}
              className="text-teal-500"
            >
              Calendar | Town of Pike Road
            </ClickLink>
          </div>
          <p>
            Vaughn East Home Owners Association plans quarterly meetings to
            provide an in person forum for homeowners to hear about various
            happenings within the neighborhood, within the Pike Road community
            and to also openly discuss concerns or issues our neighbors may be
            having.
          </p>
          <p>Next meeting planned for first of July, actual date TBD.</p>
        </div>
      </div>
    </Container>
  )
}
