import { RenderOptions, WidgetConnectorParams, Renderer, CreateWidget } from './index';

export interface PoweredByRenderOptions<T> extends RenderOptions<T> {
  url: string;
}

export interface PoweredByConnectorParams extends WidgetConnectorParams {
  url: string;
}

export type PoweredByRenderer<T> = Renderer<PoweredByRenderOptions<PoweredByConnectorParams & T>>
export type CreatePoweredBy<T> = CreateWidget<PoweredByConnectorParams & T>;

interface ConnectPoweredBy {
  // How to make this generic?
  <T>(render: PoweredByRenderer<T>, unmount: () => void): CreatePoweredBy<T>;
}

export const connectPoweredBy: ConnectPoweredBy = (render, dispose) => {
  return (widgetParams) => {
    // widgetParams.container
    widgetParams.url

    return ({
      render() {
        render({
          url: '/hello',
          instantSearchInstance: null,
          widgetParams,
        })
      },
  })};
}
