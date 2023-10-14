import Keys from '@/utils/constants/keys';

interface IEvent {
  action: string;
  category: string;
  label: string;
  value?: string;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  (window as any).gtag('config', Keys.GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: IEvent) => {
  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
