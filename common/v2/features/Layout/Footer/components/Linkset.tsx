import React from 'react';

import { AnalyticsService, ANALYTICS_CATEGORIES } from 'v2/services';
import { translateRaw } from 'v2/translations';
import './Linkset.scss';

const LINK_COLUMNS = [
  {
    heading: translateRaw('NEW_FOOTER_TEXT_6'),
    links: [
      {
        title: 'Haichain.io',
        link: 'https://www.haichain.io/',
        analytics_event: 'haichain.io'
      },
      {
        title: translateRaw('NEW_FOOTER_TEXT_7'),
        link: 'https://www.haichain.io/',
        analytics_event: 'Help & Support'
      },
      {
        title: translateRaw('NEW_FOOTER_TEXT_9'),
        link: 'https://www.haichain.io/',
        analytics_event: 'Press'
      },
      {
        title: translateRaw('NEW_FOOTER_TEXT_10'),
        link: 'https://www.haichain.io/',
        analytics_event: 'Privacy Policy'
      }
    ]
  },
  {
    heading: translateRaw('NEW_FOOTER_TEXT_11'),
    links: [
      {
        title: translateRaw('WHITE_PAPER'),
        link: 'https://www.haichain.io/index.php?m=content&c=index&a=lists&catid=31',
        analytics_event: 'White Paper'
      },
      {
        title: translateRaw('HAIC_BROWSER'),
        link: 'https://explorer.haicoin.io/app/blocks/1',
        analytics_event: 'Haic Browser'
      },
      {
        title: translateRaw('GALT_BROWSER'),
        link: 'https://explorer.galtcoin.io/app/blocks/1',
        analytics_event: 'Galt Browser'
      }
    ]
  },
  {
    heading: translateRaw('NEW_FOOTER_TEXT_12'),
    links: [
      {
        title: 'Haichain',
        link: 'https://www.haichain.io/index.php?m=content&c=index&a=lists&catid=9',
        analytics_event: 'Haichain'
      },
      {
        title: 'Galtchain',
        link: 'https://www.haichain.io/index.php?m=content&c=index&a=lists&catid=20',
        analytics_event: 'Galtchain'
      },
      {
        title: 'Haichat',
        link: 'https://www.haichain.io/index.php?m=content&c=index&a=lists&catid=22',
        analytics_event: 'Haichat'
      }
    ]
  }
];

const trackLinkClicked = (linkName: string): void => {
  AnalyticsService.instance.track(ANALYTICS_CATEGORIES.FOOTER, `${linkName} link clicked`);
};

export default function Linkset() {
  return (
    <section className="Footer-Linkset">
      {LINK_COLUMNS.map(({ heading, links }) => (
        <section key={heading} className="Linkset-column">
          <h2>{heading}</h2>
          <ul>
            {links.map(({ title, link, analytics_event }) => (
              <li key={title}>
                <a href={link} onClick={() => trackLinkClicked(analytics_event)}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
