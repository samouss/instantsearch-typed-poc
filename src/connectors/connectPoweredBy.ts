import { RenderOptions, Renderer, CreateWidget } from '../types';

export interface PoweredByRenderOptions<T> extends RenderOptions<T> {
  url: string;
}

export interface PoweredByConnectorParams {
  url: string;
}

// How to infer this from the connector? We can use namespace?
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
