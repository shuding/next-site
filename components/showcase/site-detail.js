import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'

import { PureComponent } from 'react'

import Fade from '../fade'
import { MediaQueryConsumer } from '../media-query'

function clearRoute() {
  Router.router.push('/showcase', '/showcase', { shallow: true })
}

export default class extends PureComponent {
  clickOuter = (ev) => {
    clearRoute()
  }

  render () {
    const { siteData, from } = this.props
    if (!siteData) {
      return null
    }

    let src = siteData.src

    return <MediaQueryConsumer>{({isMobile}) => <>
      <Head>
        <title>{siteData.title} - Showcase</title>
      </Head>
      <div className="lightbox" onClick={this.clickOuter} ref={el => this.lightbox = el}>
        <style jsx>{`
          .lightbox {
            position: fixed;
            z-index: 1010;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: ${isMobile ? '2rem 1rem 3rem 1rem' : '3rem 3rem 7rem 3rem'};
            background-color: rgba(0, 0, 0, 0.9);
          }
          .preview {
            width: 100%;
            height: 100%;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .info {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 1rem 2rem 2rem;
            text-align: center;
            color: white;
            text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
          }
          img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 7px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
        `}</style>
        <Fade>
          <div className={`preview`}>
            <img src={src}/>
            <div className='info'>
              <h3 className='f4'>{siteData.title}</h3>
              <Link href={siteData.link}><a className='f5'>{siteData.link}</a></Link>
            </div>
          </div>
        </Fade>
      </div>
    </>}</MediaQueryConsumer>
  }
}
