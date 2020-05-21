import fetch from 'node-fetch'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import AMA from '../components/ama'
import { connect } from 'react-redux'
import { toggleDarkMode, toggleAMA, sendTracking } from '../actions'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.handleTracking = this.handleTracking.bind(this)
    this.handleDarkMode = this.handleDarkMode.bind(this)
    this.handleAMA = this.handleAMA.bind(this)
  }

  componentDidMount() {
    const referrer = document.referrer === '' ? 'none' : document.referrer
    this.handleTracking(null, 'referrer', {
      url: referrer,
    })

    this.setDarkMode(this.props.darkMode)
  }

  componentDidUpdate(prevProps) {
    const {
      darkMode,
    } = this.props

    if (prevProps.darkMode.enabled !== darkMode.enabled) {
      this.setDarkMode(darkMode)
    }
  }

  handleDarkMode() {
    this.props.dispatch(toggleDarkMode())
  }

  setDarkMode(darkMode) {
    if (typeof window !== 'undefined') {
      if (darkMode.enabled) {
        document.documentElement.classList.add('mode-dark')
      } else {
        document.documentElement.classList.remove('mode-dark')
      }

      this.handleTracking(null, 'dark-mode', {
        state: darkMode.enabled ? 'on' : 'off',
      })
    }
  }

  handleAMA() {
    this.props.dispatch(toggleAMA())

    const {
      AMA,
    } = this.props

    if (typeof window !== 'undefined') {
      this.handleTracking(null, 'ama', {
        state: AMA.isOpened ? 'on' : 'off',
      })
    }
  }

  handleTracking(event, eventType, eventProperties = {}) {
    let href = null
    if (event) {
      event.preventDefault()
      href = event.currentTarget.href
    }

    this.props.dispatch(sendTracking({
      eventType,
      eventProperties,
      href,
    }))
  }

  render() {
    const title = `Sann-Remy Chea - Software Engineer`
    const description = `Sann-Remy Chea is a seasoned Software Engineer, located in Paris, France. He has been working in the video games industry for more than 8 years.`

    return (
      <div className="max-w-md mx-auto w-full text-gray-800 dark:text-gray-400 p-5 transition-colors duration-150 ease-in-out">
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content={description} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://src.onl" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content="/social.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://src.onl" />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content="/social.png" />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="flex items-center justify-center flex-col">
            {/* Action bar */}
            <div className="flex items-center justify-end w-full mb-1">
              <div title="Ask Me Anything" onClick={this.handleAMA} className="flex items-center w-6 h-6 p-1 mr-1 border border-gray-300 dark:border-gray-700 hover:border-gray-700 dark-hover:border-gray-500 cursor-pointer transition-colors duration-150 ease-in-out rounded-full">
                <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"></path></svg>
              </div>
              <div title="Dark mode" onClick={this.handleDarkMode} className="flex items-center w-6 h-6 p-1 border border-gray-300 dark:border-gray-700 hover:border-gray-700 dark-hover:border-gray-500 cursor-pointer transition-colors duration-150 ease-in-out rounded-full">
                <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"></path></svg>
              </div>
            </div>

            {/* <AMA isOpened={ama} /> */}

            {/* Picture + Name + Role */}
            <Link href="/">
              <a className="block w-32 mx-auto border border border-gray-300 dark:border-gray-700 hover:border-gray-700 dark-hover:border-gray-500 transition-colors duration-150 ease-in-out rounded-full p-1">
                <img className="w-full rounded-full dark:opacity-90" src="/sann-remy-chea.jpg" />
              </a>
            </Link>
            <h1 className="mt-3 font-semibold text-xl text-center">Sann-Remy Chea</h1>
            <h2 className="mt-1 text-base text-center text-gray-600 dark:text-gray-600">Software Engineer</h2>
          </div>

          {/* Description */}
          <p className="mt-10 text-sm">
            Working for Activision Blizzard, I&nbsp;create Web &amp; Mobile apps, I&nbsp;also mentor developers. Located in the Paris area in France, I&nbsp;speak English and French.
          </p>
        </main>

        {/* Social links */}
        <footer>
          <ul className="mt-10 mx-auto w-full flex items-center justify-between" style={{
            maxWidth: '260px',
          }}>
            <li className="w-8">
              <a onClick={e => this.handleTracking(e, 'click', { label: 'footer-github-icon' })} rel="nofollow" href="https://github.com/srchea" className="block hover:opacity-75 transition-opacity duration-150 ease-in-out">
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414"><path fillRule="nonzero" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
            </li>
            <li className="w-8">
              <a onClick={e => this.handleTracking(e, 'click', { label: 'footer-codepen-icon' })} rel="nofollow" href="https://codepen.io/srchea" className="block hover:opacity-75 transition-opacity duration-150 ease-in-out">
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414"><path fillRule="nonzero" d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.045-.046-.03-.06-.044-.044-.04-.015-.02L12.58.19c-.347-.232-.796-.232-1.142 0L.453 7.502l-.015.015-.044.035-.06.05-.038.04-.05.056-.037.045-.05.06c-.02.017-.03.03-.03.046l-.05.06-.02.06c-.02.01-.02.04-.03.07l-.01.05C0 8.12 0 8.15 0 8.18v7.497c0 .044.003.09.01.135l.01.046c.005.03.01.06.02.086l.015.05c.01.027.016.053.027.075l.022.05c0 .01.015.04.03.06l.03.04c.015.01.03.04.045.06l.03.04.04.04c.01.013.01.03.03.03l.06.042.04.03.01.014 10.97 7.33c.164.12.375.163.57.163s.39-.06.57-.18l10.99-7.28.014-.01.046-.037.06-.043.048-.036.052-.058.033-.045.04-.06.03-.05.03-.07.016-.052.03-.077.015-.045.03-.08v-7.5c0-.05 0-.095-.016-.14l-.014-.045.044.003zm-11.99 6.28l-3.65-2.44 3.65-2.442 3.65 2.44-3.65 2.44zm-1.034-6.674l-4.473 2.99L2.89 8.362l8.086-5.39V7.79zm-6.33 4.233l-2.582 1.73V10.3l2.582 1.726zm1.857 1.25l4.473 2.99v4.82L2.89 15.69l3.618-2.417v-.004zm6.537 2.99l4.474-2.98 3.613 2.42-8.087 5.39v-4.82zm6.33-4.23l2.583-1.72v3.456l-2.583-1.73zm-1.855-1.24L13.042 7.8V2.97l8.085 5.39-3.612 2.415v.003z"/></svg>
              </a>
            </li>
            <li className="w-8">
              <a onClick={e => this.handleTracking(e, 'click', { label: 'footer-linkedin-icon' })} rel="nofollow" href="https://www.linkedin.com/in/srchea" className="block hover:opacity-75 transition-opacity duration-150 ease-in-out">
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414"><path fillRule="nonzero" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      darkMode: state.DarkMode,
      AMA: state.AMA,
  }
}

export default connect(mapStateToProps)(Home)
