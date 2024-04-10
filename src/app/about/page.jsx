import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import {Container} from '@/components/Container'
import {
    GitHubIcon,
    InstagramIcon,
    LinkedInIcon,
    TwitterIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({className, href, children, icon: Icon}) {
    return (
        <li className={clsx(className, 'flex')}>
            <Link
                href={href}
                className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
            >
                <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"/>
                <span className="ml-4">{children}</span>
            </Link>
        </li>
    )
}

function MailIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                fillRule="evenodd"
                d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
            />
        </svg>
    )
}

export const metadata = {
    title: 'About',
    description:
        'What is the purpose of our HOA?',
}

export default function About() {
    return (
        <Container className="mt-16 sm:mt-32">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="lg:pl-20">
                    <div className="max-w-xs px-2.5 lg:max-w-none">
                        <Image
                            src={portraitImage}
                            alt=""
                            sizes="(min-width: 1024px) 32rem, 20rem"
                            className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                        />
                    </div>
                </div>
                <div className="lg:order-first lg:row-span-2">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        What is the purpose of our HOA?.
                    </h1>
                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                        <p>
                            An HOA is a private organization that governs a community.
                        </p>
                        <p>
                            We have covenants, conditions and restrictions which outline the rules for our neighborhood.
                        </p>
                        <p>
                            We have bylaws which outline what our meeting, voting and election rules.
                        </p>
                        <p>
                            We collect dues annually which provides for upkeep of shared areas and other budgetary
                            expenses such as paying for the street lights, water up front and mowing the front entrance,
                            etc.
                        </p>
                        <p>
                            We have a board of directors that are voted on and then serve for 2 years, all of whom are
                            neighbors that volunteer and live in this community. We have a President, Vice President,
                            Treasurer and Secretary.
                        </p>
                    </div>
                </div>
                <div className="lg:pl-20">
                    <ul role="list">
                        <SocialLink href="#" icon={TwitterIcon}>
                            Follow on Twitter
                        </SocialLink>
                        <SocialLink href="#" icon={InstagramIcon} className="mt-4">
                            Follow on Instagram
                        </SocialLink>
                    </ul>
                </div>
            </div>
            {/*    add dome flex items in a column*/}
            <div className="flex flex-col items-center mt-16">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                    What is a Voluntary HOA vs. a Mandatory HOA?
                </h2>
                <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                    <p>
                        A mandatory HOA is just that – mandatory. When a person purchases a home within a neighborhood,
                        they are required to join and follow all rules set forth in the association’s governing
                        documents. At the time of closing, the homeowner signs a contract agreeing to abide by the
                        covenants and restrictions, and to accept any and all associated assessments, fees, and fines.
                        On the flipside, Vaughn East is a voluntary HOA, the purchasers of a home can decide whether or
                        not they want to join the association.
                    </p>
                    <p>
                        The main purpose is to assist our neighbors with maintaining property values.
                        What we would like our neighbors to do is participate in the HOA, come be part of a community,
                        learn who your neighbors are, help each other out and participate in community events or
                        volunteer your time to events the HOA is hosting.
                        It is on all of us to be good stewards of our property and be responsible for it’s maintenance
                        and upkeep as well as being respectful to our neighbors.

                    </p>
                </div>
                <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400 self-start">
                    <dl>
                        <dt className="h3 text-2xl text-zinc-800 dark:text-zinc-100">What do we typically cover in the
                            quarterly meetings?
                        </dt>
                        <dd>
                            <ul className="list-disc pl-5">
                                <li>ld and New Business</li>
                                <li>Open forum for community feedback</li>
                                <li>Social time with our friends and neighbors</li>
                                <li>Guest speakers (some meetings)</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        </Container>
    )
}
