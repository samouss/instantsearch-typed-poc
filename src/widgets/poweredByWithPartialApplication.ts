import { connectPoweredBy, PoweredByRenderer } from '../connectors';
import { CreateWidget } from '../types';

export type CreatePoweredByWithURL = CreateWidget<PoweredByWithURLWidgetParams>;

interface PoweredByWithURLWidgetParams {
  container: string | HTMLElement;
}

const renderPoweredByWithURL: PoweredByRenderer<PoweredByWithURLWidgetParams>= ({ url, widgetParams }) => {
  widgetParams.container
  widgetParams.url
  url
};

export const poweredByWithURL: CreatePoweredByWithURL = ({ container, ...rest }) => {
  const createWidget = connectPoweredBy<PoweredByWithURLWidgetParams>(
    renderPoweredByWithURL,
    () => {}
  );

  return createWidget({
    ...rest,
    url: '/instantsearch',
    container,
  });
};
