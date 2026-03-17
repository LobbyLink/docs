import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/webrtc/intro"
            style={{ lineHeight: '1.2', padding: '15px 25px' }} // Zeilenabstand & Padding optimiert
          >
            Godot x WebRTC
            <span style={{ display: 'block', fontSize: '0.65em', fontWeight: 'normal', marginTop: '4px' }}>
              Learn about WebRTC!
            </span>
          </Link>

          <Link
            className="button button--secondary button--lg"
            to="/lobbylink/intro"
            style={{ lineHeight: '1.2', padding: '15px 25px' }}
          >
            LobbyLink Addon
            <span style={{ display: 'block', fontSize: '0.65em', fontWeight: 'normal', marginTop: '4px' }}>
              I just want to use it!
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
