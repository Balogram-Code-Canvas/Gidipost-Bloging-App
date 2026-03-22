import ReactGA from 'react-ga4'

export const initGA = () => {
  ReactGA.initialize('G-G3KR0CLB7T')
}

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path
  })
}