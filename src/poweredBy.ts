import { connectPoweredBy, PoweredByRenderer, PoweredByConnectorParams } from './connectPoweredBy';
import { CreateWidget } from './index';

interface PoweredByWidgetParams extends PoweredByConnectorParams {
  container: string | HTMLElement;
}

const renderPoweredBy: PoweredByRenderer<PoweredByWidgetParams>= ({ url, widgetParams }) => {
  widgetParams.container
  widgetParams.url
  url
};

export const poweredBy: CreateWidget<PoweredByWidgetParams> = ({ container, url, ...rest }) => {
  const createWidget = connectPoweredBy<PoweredByWidgetParams>(
    renderPoweredBy,
    () => {}
  );

  return createWidget({
    ...rest,
    container,
    url,
  });
};
